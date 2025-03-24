import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { formatDate } from '@/lib/utils';
import { Phone, Mail, Calendar, MessageSquare, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Enquiry } from '@/types';

const EnquiryManager: React.FC = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [refreshCount, setRefreshCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const fetchEnquiries = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Fetching enquiries with filter:', statusFilter);
      
      // Build the query
      let query = supabase.from('enquiries').select('*');
      
      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }
      
      // Execute the query with better error handling
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) {
        console.error('Supabase query error:', error);
        throw new Error(`Failed to fetch enquiries: ${error.message}`);
      }
      
      console.log('Enquiries fetched successfully:', data?.length || 0);
      setEnquiries(data as Enquiry[] || []);
    } catch (error: any) {
      console.error('Error in fetchEnquiries:', error);
      setError(error.message || 'Failed to load enquiries');
      toast.error('Failed to load enquiries. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('EnquiryManager mounted or dependencies changed');
    fetchEnquiries();
    
    // Set up realtime subscription
    const channel = supabase
      .channel('enquiries-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'enquiries' }, 
        (payload) => {
          console.log('Realtime update received:', payload);
          fetchEnquiries();
        }
      )
      .subscribe((status) => {
        console.log('Subscription status:', status);
      });
      
    return () => {
      console.log('Cleaning up subscription');
      supabase.removeChannel(channel);
    };
  }, [statusFilter, refreshCount]);

  const handleRefresh = () => {
    console.log('Manual refresh triggered');
    setRefreshCount(prev => prev + 1);
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      console.log(`Updating enquiry ${id} status to ${newStatus}`);
      
      const { error } = await supabase
        .from('enquiries')
        .update({ status: newStatus })
        .eq('id', id);
      
      if (error) {
        console.error('Update status error:', error);
        throw new Error(`Failed to update status: ${error.message}`);
      }
      
      toast.success(`Enquiry marked as ${newStatus}`);
      fetchEnquiries();
    } catch (error: any) {
      console.error('Error in updateStatus:', error);
      toast.error(error.message || 'Failed to update status');
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="text-center py-8">
          <MessageSquare className="mx-auto h-12 w-12 text-red-400 mb-3" />
          <h3 className="text-lg font-medium mb-1">Error Loading Enquiries</h3>
          <p className="text-gray-500 mb-4">{error}</p>
          <Button onClick={handleRefresh} variant="outline">Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium">Customer Enquiries</h2>
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={handleRefresh}
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <div className="flex gap-2">
            <Button 
              variant={statusFilter === 'all' ? 'default' : 'outline'} 
              onClick={() => setStatusFilter('all')}
              size="sm"
            >
              All
            </Button>
            <Button 
              variant={statusFilter === 'new' ? 'default' : 'outline'} 
              onClick={() => setStatusFilter('new')}
              size="sm"
            >
              New
            </Button>
            <Button 
              variant={statusFilter === 'in_progress' ? 'default' : 'outline'} 
              onClick={() => setStatusFilter('in_progress')}
              size="sm"
            >
              In Progress
            </Button>
            <Button 
              variant={statusFilter === 'resolved' ? 'default' : 'outline'} 
              onClick={() => setStatusFilter('resolved')}
              size="sm"
            >
              Resolved
            </Button>
          </div>
        </div>
      </div>
      
      {enquiries.length === 0 ? (
        <div className="text-center py-8">
          <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-3" />
          <h3 className="text-lg font-medium mb-1">No enquiries found</h3>
          <p className="text-gray-500">There are no enquiries matching your current filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {enquiries.map((enquiry) => (
            <div key={enquiry.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <h3 className="font-medium">{enquiry.name}</h3>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(enquiry.status)}`}>
                  {enquiry.status.charAt(0).toUpperCase() + enquiry.status.slice(1).replace('_', ' ')}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3 text-sm text-gray-600">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <a href={`mailto:${enquiry.email}`} className="hover:text-primary">{enquiry.email}</a>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <a href={`tel:${enquiry.phone}`} className="hover:text-primary">{enquiry.phone}</a>
                </div>
                <div className="flex items-center md:col-span-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{formatDate(enquiry.created_at)}</span>
                </div>
              </div>
              
              <div className="p-3 bg-gray-50 rounded mb-3 text-gray-700">
                {enquiry.message}
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {enquiry.status !== 'in_progress' && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => updateStatus(enquiry.id, 'in_progress')}
                  >
                    Mark as In Progress
                  </Button>
                )}
                
                {enquiry.status !== 'resolved' && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => updateStatus(enquiry.id, 'resolved')}
                  >
                    Mark as Resolved
                  </Button>
                )}
                
                {enquiry.status !== 'archived' && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => updateStatus(enquiry.id, 'archived')}
                  >
                    Archive
                  </Button>
                )}
                
                {enquiry.status === 'archived' && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => updateStatus(enquiry.id, 'new')}
                  >
                    Restore
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnquiryManager;
