
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardTabs from '@/components/dashboard/DashboardTabs';
import ClassesTab from '@/components/dashboard/ClassesTab';
import UserPointsSection from '@/components/points/UserPointsSection';
import WeightSection from '@/components/weight/WeightSection';
import HabitSection from '@/components/habits/HabitSection';

const Dashboard = () => {
  const { profile, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("classes");

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "classes":
        return <ClassesTab />;
      case "habits":
        return <HabitSection />;
      case "points":
        return <UserPointsSection />;
      case "weight":
        return <WeightSection />;
      default:
        return <ClassesTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardHeader 
          userName={profile?.full_name || 'User'} 
          membershipType={profile?.membership_type || 'basic'}
          onLogout={handleLogout}
        />
        
        <DashboardTabs 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
        
        <div className="mt-8">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
