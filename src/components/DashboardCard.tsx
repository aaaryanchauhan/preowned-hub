
import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface DashboardCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  className?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  icon: Icon,
  className,
}) => {
  return (
    <motion.div 
      className={cn("dashboard-card", className)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex justify-between items-start">
        <h3 className="dashboard-label">{title}</h3>
        <div className="p-2 rounded-full bg-blue-50 text-blue-500">
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <p className="dashboard-value">{value}</p>
    </motion.div>
  );
};

export default DashboardCard;
