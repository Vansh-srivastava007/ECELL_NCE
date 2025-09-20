import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { User, Edit2, Heart, MessageCircle, Calendar, Trophy, Briefcase, MapPin, Mail, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UserProfile {
  name: string;
  email: string;
  department: string;
  year: string;
  bio: string;
  avatar?: string;
  joinDate: Date;
  interests: string[];
}

interface UserStats {
  postsCount: number;
  likesReceived: number;
  commentsCount: number;
  eventsAttended: number;
}

export default function EnhancedProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats>({ postsCount: 0, likesReceived: 0, commentsCount: 0, eventsAttended: 0 });
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = () => {
    setIsLoading(true);
    try {
      // Load profile
      const savedProfile = localStorage.getItem('ecell-user-profile');
      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        setProfile({ ...parsed, joinDate: new Date(parsed.joinDate) });
      } else {
        // Default profile
        const defaultProfile: UserProfile = {
          name: 'Current User',
          email: 'student@ncechandi.edu',
          department: 'Computer Science Engineering',
          year: '3rd Year',
          bio: 'Passionate about entrepreneurship and innovation. Always looking for opportunities to learn and grow in the startup ecosystem.',
          joinDate: new Date('2023-08-01'),
          interests: ['Startups', 'Technology', 'Innovation', 'Networking']
        };
        setProfile(defaultProfile);
        localStorage.setItem('ecell-user-profile', JSON.stringify(defaultProfile));
      }

      // Load and calculate stats
      calculateUserStats();
      loadUserPosts();
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateUserStats = () => {
    try {
      // Posts count
      const posts = JSON.parse(localStorage.getItem('ecell-posts') || '[]');
      const userPostsCount = posts.filter((post: any) => post.author === 'Current User').length;

      // Likes received
      const totalLikes = posts
        .filter((post: any) => post.author === 'Current User')
        .reduce((sum: number, post: any) => sum + post.likes, 0);

      // Comments count (user's comments on all posts)
      const totalComments = posts.reduce((sum: number, post: any) => {
        return sum + post.comments.filter((comment: any) => comment.author === 'Current User').length;
      }, 0);

      // Events attended
      const rsvpData = JSON.parse(localStorage.getItem('ecell-rsvp') || '{}');
      const eventsAttended = Object.values(rsvpData).filter(Boolean).length;

      setStats({
        postsCount: userPostsCount,
        likesReceived: totalLikes,
        commentsCount: totalComments,
        eventsAttended: eventsAttended
      });
    } catch (error) {
      console.error('Error calculating stats:', error);
    }
  };

  const loadUserPosts = () => {
    try {
      const posts = JSON.parse(localStorage.getItem('ecell-posts') || '[]');
      const userPosts = posts
        .filter((post: any) => post.author === 'Current User')
        .sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, 3); // Show only latest 3 posts
      
      setUserPosts(userPosts);
    } catch (error) {
      console.error('Error loading user posts:', error);
    }
  };

  const handleEditProfile = () => {
    if (profile) {
      setEditForm({ ...profile });
      setIsEditingProfile(true);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editForm) return;

    try {
      const updatedProfile = { ...editForm };
      setProfile(updatedProfile);
      localStorage.setItem('ecell-user-profile', JSON.stringify(updatedProfile));
      setIsEditingProfile(false);
      
      toast({
        title: "Profile updated!",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatJoinDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-muted rounded-full animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-6 bg-muted rounded animate-pulse w-40"></div>
                <div className="h-4 bg-muted rounded animate-pulse w-32"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="h-8 bg-muted rounded animate-pulse mb-2"></div>
                <div className="h-4 bg-muted rounded animate-pulse"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-bold text-card-foreground mb-2">Profile Not Found</h3>
          <p className="text-muted-foreground">Unable to load profile data.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="border border-card-border">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
            <div className="flex items-center space-x-6 mb-4 sm:mb-0">
              <Avatar className="w-20 h-20">
                {profile.avatar ? (
                  <AvatarImage src={profile.avatar} alt={profile.name} />
                ) : (
                  <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                    {profile.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
              
              <div className="space-y-1">
                <h1 className="text-2xl font-bold text-card-foreground" data-testid="text-profile-name">
                  {profile.name}
                </h1>
                <div className="flex items-center text-muted-foreground">
                  <BookOpen className="w-4 h-4 mr-2" />
                  <span data-testid="text-profile-department">{profile.department}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Joined {formatJoinDate(profile.joinDate)}</span>
                </div>
              </div>
            </div>
            
            <Dialog open={isEditingProfile} onOpenChange={setIsEditingProfile}>
              <DialogTrigger asChild>
                <Button variant="outline" className="hover-elevate" onClick={handleEditProfile} data-testid="button-edit-profile">
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>
                {editForm && (
                  <form onSubmit={handleSaveProfile} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={editForm.name}
                          onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                          data-testid="input-edit-name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={editForm.email}
                          onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                          data-testid="input-edit-email"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="department">Department</Label>
                        <Input
                          id="department"
                          value={editForm.department}
                          onChange={(e) => setEditForm({...editForm, department: e.target.value})}
                          data-testid="input-edit-department"
                        />
                      </div>
                      <div>
                        <Label htmlFor="year">Academic Year</Label>
                        <Input
                          id="year"
                          value={editForm.year}
                          onChange={(e) => setEditForm({...editForm, year: e.target.value})}
                          data-testid="input-edit-year"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={editForm.bio}
                        onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                        placeholder="Tell us about yourself..."
                        className="min-h-[100px]"
                        data-testid="textarea-edit-bio"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="interests">Interests (comma-separated)</Label>
                      <Input
                        id="interests"
                        value={editForm.interests.join(', ')}
                        onChange={(e) => setEditForm({
                          ...editForm, 
                          interests: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                        })}
                        placeholder="e.g., Startups, Technology, Innovation"
                        data-testid="input-edit-interests"
                      />
                    </div>
                    
                    <div className="flex justify-end space-x-2 pt-4">
                      <Button type="button" variant="outline" onClick={() => setIsEditingProfile(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" className="hover-elevate" data-testid="button-save-profile">
                        Save Changes
                      </Button>
                    </div>
                  </form>
                )}
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="space-y-4">
            <p className="text-muted-foreground" data-testid="text-profile-bio">
              {profile.bio}
            </p>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-card-foreground">Interests:</span>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover-elevate border border-card-border">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mx-auto mb-2">
              <MessageCircle className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-card-foreground" data-testid="text-posts-count">
              {stats.postsCount}
            </h3>
            <p className="text-sm text-muted-foreground">Posts</p>
          </CardContent>
        </Card>

        <Card className="hover-elevate border border-card-border">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-red-500/10 rounded-full mx-auto mb-2">
              <Heart className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-card-foreground" data-testid="text-likes-count">
              {stats.likesReceived}
            </h3>
            <p className="text-sm text-muted-foreground">Likes Received</p>
          </CardContent>
        </Card>

        <Card className="hover-elevate border border-card-border">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-500/10 rounded-full mx-auto mb-2">
              <MessageCircle className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold text-card-foreground" data-testid="text-comments-count">
              {stats.commentsCount}
            </h3>
            <p className="text-sm text-muted-foreground">Comments</p>
          </CardContent>
        </Card>

        <Card className="hover-elevate border border-card-border">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-green-500/10 rounded-full mx-auto mb-2">
              <Calendar className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-card-foreground" data-testid="text-events-count">
              {stats.eventsAttended}
            </h3>
            <p className="text-sm text-muted-foreground">Events RSVP'd</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Posts */}
      <Card className="border border-card-border">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageCircle className="w-5 h-5 mr-2" />
            Recent Posts
          </CardTitle>
        </CardHeader>
        <CardContent>
          {userPosts.length === 0 ? (
            <div className="text-center py-8">
              <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No posts yet</p>
              <p className="text-sm text-muted-foreground">Share your entrepreneurial journey with the community!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {userPosts.map((post) => (
                <div key={post.id} className="border border-card-border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                      {new Date(post.timestamp).toLocaleDateString()}
                    </span>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Heart className="w-4 h-4 mr-1" />
                        {post.likes}
                      </span>
                      <span className="flex items-center">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {post.comments.length}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-card-foreground line-clamp-3">
                    {post.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}