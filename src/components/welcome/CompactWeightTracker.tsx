
import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Scale, Target, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { SubscriptionRequiredModal } from '@/components/SubscriptionRequiredModal';

interface CompactWeightTrackerProps {
  weightGoal: any;
  weightEntries: any[];
}

const CompactWeightTracker = ({ weightGoal, weightEntries }: CompactWeightTrackerProps) => {
  const { profile } = useAuth();
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  // Check if user has active membership
  const hasActiveMembership = profile?.membership_type && profile.membership_type !== 'basic';

  // Memoize calculations to prevent unnecessary re-renders
  const weightData = useMemo(() => {
    const currentWeight = weightEntries?.[0]?.weight;
    const weightLost = weightGoal && currentWeight ? weightGoal.start_weight - currentWeight : 0;
    const progressPercentage = weightGoal?.target_weight && currentWeight 
      ? Math.min(((weightGoal.start_weight - currentWeight) / (weightGoal.start_weight - weightGoal.target_weight)) * 100, 100)
      : 0;

    return { currentWeight, weightLost, progressPercentage };
  }, [weightGoal, weightEntries]);

  const handleWeightTrackingClick = () => {
    if (!hasActiveMembership) {
      setShowSubscriptionModal(true);
      return;
    }
    // Navigate to weight tracking page or open modal
  };

  return (
    <>
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg">
            <Scale className="h-5 w-5 mr-2 text-purple-600" />
            Weight Progress
          </CardTitle>
          <CardDescription>Track your wellness journey</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          {!hasActiveMembership ? (
            <div className="text-center py-4">
              <div className="text-gray-500 mb-3">
                🌟 Premium feature
              </div>
              <Button 
                size="sm"
                onClick={handleWeightTrackingClick}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Unlock Weight Tracking
              </Button>
            </div>
          ) : !weightGoal ? (
            <div className="text-center py-4">
              <Target className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-3">Set your weight goal to start tracking</p>
              <Button size="sm" variant="outline">
                <Target className="h-4 w-4 mr-2" />
                Set Goal
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Current</p>
                  <p className="text-lg font-semibold text-blue-600">
                    {weightData.currentWeight ? `${weightData.currentWeight} kg` : 'No data'}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Lost</p>
                  <p className="text-lg font-semibold text-green-600">
                    {weightData.weightLost > 0 ? `${weightData.weightLost.toFixed(1)} kg` : '0 kg'}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Target</p>
                  <p className="text-lg font-semibold text-purple-600">
                    {weightGoal.target_weight ? `${weightGoal.target_weight} kg` : 'Not set'}
                  </p>
                </div>
              </div>
              
              {weightGoal.target_weight && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress to Goal</span>
                    <span>
                      {weightData.progressPercentage.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${Math.min(weightData.progressPercentage, 100)}%` 
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <SubscriptionRequiredModal 
        isOpen={showSubscriptionModal} 
        onClose={() => setShowSubscriptionModal(false)} 
      />
    </>
  );
};

export default CompactWeightTracker;
