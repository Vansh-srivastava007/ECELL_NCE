import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import PostCard from './PostCard';
import PostCreation from './PostCreation';
import { RefreshCw, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
}

interface Post {
  id: string;
  content: string;
  author: string;
  avatar: string;
  timestamp: Date;
  likes: number;
  comments: Comment[];
  image?: string;
}

export default function PostTimeline() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = () => {
    setIsLoading(true);
    try {
      const savedPosts = localStorage.getItem('ecell-posts');
      if (savedPosts) {
        const parsedPosts = JSON.parse(savedPosts);
        // Convert timestamp strings back to Date objects
        const postsWithDates = parsedPosts.map((post: any) => ({
          ...post,
          timestamp: new Date(post.timestamp),
          comments: post.comments.map((comment: any) => ({
            ...comment,
            timestamp: new Date(comment.timestamp)
          }))
        }));
        setPosts(postsWithDates);
      } else {
        // Add some initial sample posts for better UX
        const samplePosts: Post[] = [
          {
            id: 'sample-1',
            content: 'Just attended an amazing workshop on startup fundamentals! The insights on market validation were particularly valuable. Excited to apply these learnings to my project. 🚀',
            author: 'E-Cell Team',
            avatar: 'ET',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
            likes: 12,
            comments: [
              {
                id: 'comment-1',
                author: 'Student Member',
                content: 'This was incredibly helpful! Thanks for organizing.',
                timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000)
              }
            ]
          },
          {
            id: 'sample-2',
            content: 'Reminder: Our monthly networking session is coming up next week. This is a great opportunity to connect with alumni entrepreneurs and potential mentors. Registration link in bio!',
            author: 'E-Cell NCE',
            avatar: 'EC',
            timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
            likes: 24,
            comments: []
          }
        ];
        setPosts(samplePosts);
        localStorage.setItem('ecell-posts', JSON.stringify(samplePosts));
      }
    } catch (error) {
      console.error('Error loading posts:', error);
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewPost = (newPost: Post) => {
    setPosts(prev => [newPost, ...prev]);
  };

  const handlePostUpdate = (updatedPost: Post) => {
    setPosts(prev => 
      prev.map(post => post.id === updatedPost.id ? updatedPost : post)
    );
  };

  const handleRefresh = () => {
    loadPosts();
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Create Post Card */}
        <Card className="border border-card-border">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-muted rounded-full animate-pulse"></div>
              <div className="flex-1 h-12 bg-muted rounded-lg animate-pulse"></div>
            </div>
          </CardContent>
        </Card>
        
        {/* Loading Posts */}
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border border-card-border">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-10 h-10 bg-muted rounded-full animate-pulse"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-muted rounded animate-pulse w-32"></div>
                  <div className="h-3 bg-muted rounded animate-pulse w-20"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded animate-pulse"></div>
                <div className="h-4 bg-muted rounded animate-pulse w-3/4"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Create Post Section */}
      <Card className="border border-card-border">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold text-card-foreground" data-testid="text-timeline-title">
                Community Feed
              </h2>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                className="hover-elevate"
                data-testid="button-refresh-posts"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <PostCreation onPostCreate={handleNewPost} />
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground" data-testid="text-timeline-description">
            Share your entrepreneurial journey, insights, and connect with the E-Cell community.
          </p>
        </CardContent>
      </Card>

      {/* Posts Timeline */}
      {posts.length === 0 ? (
        <Card className="border border-card-border">
          <CardContent className="p-12 text-center">
            <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-bold text-card-foreground mb-2" data-testid="text-no-posts-title">
              No Posts Yet
            </h3>
            <p className="text-muted-foreground mb-6" data-testid="text-no-posts-description">
              Be the first to share something with the E-Cell community!
            </p>
            <PostCreation onPostCreate={handleNewPost} />
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard 
              key={post.id} 
              post={post} 
              onUpdate={handlePostUpdate}
            />
          ))}
        </div>
      )}

      {posts.length > 0 && (
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">
            You've reached the end of the timeline
          </p>
        </div>
      )}
    </div>
  );
}