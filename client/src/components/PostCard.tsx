import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Heart, MessageCircle, Share, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

interface PostCardProps {
  post: Post;
  onUpdate: (updatedPost: Post) => void;
}

export default function PostCard({ post, onUpdate }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isCommenting, setIsCommenting] = useState(false);
  const { toast } = useToast();

  const handleLike = async () => {
    try {
      const newLikedState = !isLiked;
      const newLikesCount = newLikedState ? post.likes + 1 : post.likes - 1;
      
      setIsLiked(newLikedState);
      
      const updatedPost = {
        ...post,
        likes: newLikesCount
      };
      
      // Update localStorage
      const existingPosts = JSON.parse(localStorage.getItem('ecell-posts') || '[]');
      const updatedPosts = existingPosts.map((p: Post) => 
        p.id === post.id ? updatedPost : p
      );
      localStorage.setItem('ecell-posts', JSON.stringify(updatedPosts));
      
      onUpdate(updatedPost);
      
      if (newLikedState) {
        toast({
          title: "Post liked!",
          description: "You liked this post.",
        });
      }
    } catch (error) {
      setIsLiked(!isLiked); // Revert on error
      toast({
        title: "Error",
        description: "Failed to update like. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    setIsCommenting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const comment: Comment = {
        id: Date.now().toString(),
        author: 'Current User',
        content: newComment.trim(),
        timestamp: new Date()
      };
      
      const updatedPost = {
        ...post,
        comments: [...post.comments, comment]
      };
      
      // Update localStorage
      const existingPosts = JSON.parse(localStorage.getItem('ecell-posts') || '[]');
      const updatedPosts = existingPosts.map((p: Post) => 
        p.id === post.id ? updatedPost : p
      );
      localStorage.setItem('ecell-posts', JSON.stringify(updatedPosts));
      
      onUpdate(updatedPost);
      setNewComment('');
      setShowComments(true);
      
      toast({
        title: "Comment added!",
        description: "Your comment has been posted.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add comment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCommenting(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `E-Cell NCE Post by ${post.author}`,
        text: post.content,
      });
    } else {
      navigator.clipboard.writeText(post.content);
      toast({
        title: "Post copied!",
        description: "Post content copied to clipboard.",
      });
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - new Date(timestamp).getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <Card className="hover-elevate border border-card-border" data-testid={`post-card-${post.id}`}>
      <CardContent className="p-6">
        {/* Post Header */}
        <div className="flex items-start space-x-3 mb-4">
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-primary/10 text-primary">
              {post.avatar}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-card-foreground" data-testid={`text-post-author-${post.id}`}>
              {post.author}
            </h3>
            <p className="text-xs text-muted-foreground" data-testid={`text-post-timestamp-${post.id}`}>
              {formatTimestamp(post.timestamp)}
            </p>
          </div>
        </div>

        {/* Post Content */}
        <div className="mb-4">
          <p className="text-sm text-card-foreground whitespace-pre-wrap" data-testid={`text-post-content-${post.id}`}>
            {post.content}
          </p>
          {post.image && (
            <img 
              src={post.image} 
              alt="Post attachment" 
              className="mt-3 max-w-full h-64 object-cover rounded-lg"
              data-testid={`img-post-image-${post.id}`}
            />
          )}
        </div>

        {/* Engagement Stats */}
        {(post.likes > 0 || post.comments.length > 0) && (
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-3 pb-3 border-b border-border">
            {post.likes > 0 && (
              <span data-testid={`text-likes-count-${post.id}`}>
                {post.likes} {post.likes === 1 ? 'like' : 'likes'}
              </span>
            )}
            {post.comments.length > 0 && (
              <button 
                onClick={() => setShowComments(!showComments)}
                className="hover:underline"
                data-testid={`button-toggle-comments-${post.id}`}
              >
                {post.comments.length} {post.comments.length === 1 ? 'comment' : 'comments'}
              </button>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="sm"
            className={`hover-elevate ${isLiked ? 'text-red-500' : 'text-muted-foreground'}`}
            onClick={handleLike}
            data-testid={`button-like-${post.id}`}
          >
            <Heart className={`w-4 h-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
            Like
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover-elevate"
            onClick={() => setShowComments(!showComments)}
            data-testid={`button-comment-${post.id}`}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Comment
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover-elevate"
            onClick={handleShare}
            data-testid={`button-share-${post.id}`}
          >
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="space-y-4 border-t border-border pt-4">
            {/* Existing Comments */}
            {post.comments.map((comment) => (
              <div key={comment.id} className="flex items-start space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                    {comment.author.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="bg-muted rounded-lg p-3">
                    <p className="text-xs font-medium text-muted-foreground mb-1">
                      {comment.author}
                    </p>
                    <p className="text-sm text-card-foreground" data-testid={`text-comment-content-${comment.id}`}>
                      {comment.content}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatTimestamp(comment.timestamp)}
                  </p>
                </div>
              </div>
            ))}

            {/* Add Comment Form */}
            <form onSubmit={handleComment} className="flex items-start space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-primary/10 text-primary text-xs">CU</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="min-h-[60px] resize-none"
                  data-testid={`input-new-comment-${post.id}`}
                />
                <div className="flex justify-end mt-2">
                  <Button 
                    type="submit" 
                    size="sm" 
                    disabled={!newComment.trim() || isCommenting}
                    className="hover-elevate"
                    data-testid={`button-submit-comment-${post.id}`}
                  >
                    {isCommenting ? (
                      "Posting..."
                    ) : (
                      <>
                        <Send className="w-3 h-3 mr-1" />
                        Comment
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        )}
      </CardContent>
    </Card>
  );
}