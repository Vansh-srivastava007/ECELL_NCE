import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Plus, Image as ImageIcon, X, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
}

export default function PostCreation({ onPostCreate }: { onPostCreate: (post: Post) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const MAX_CHARACTERS = 280;
  const remainingChars = MAX_CHARACTERS - content.length;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || content.length > MAX_CHARACTERS) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newPost: Post = {
        id: Date.now().toString(),
        content: content.trim(),
        author: 'Current User', // todo: replace with actual user data
        avatar: 'CU',
        timestamp: new Date(),
        likes: 0,
        comments: [],
        image: imagePreview || undefined
      };

      // Save to localStorage
      const existingPosts = JSON.parse(localStorage.getItem('ecell-posts') || '[]');
      const updatedPosts = [newPost, ...existingPosts];
      localStorage.setItem('ecell-posts', JSON.stringify(updatedPosts));

      onPostCreate(newPost);
      setContent('');
      setImagePreview(null);
      setIsOpen(false);
      
      toast({
        title: "Post created successfully!",
        description: "Your post has been shared with the E-Cell community.",
      });
    } catch (error) {
      toast({
        title: "Error creating post",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isValid = content.trim().length > 0 && content.length <= MAX_CHARACTERS;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="hover-elevate" data-testid="button-create-post-trigger">
          <Plus className="w-5 h-5 mr-2" />
          Create Post
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle data-testid="text-create-post-title">Create New Post</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-start space-x-4">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-primary/10 text-primary">CU</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-4">
              <Textarea
                placeholder="What's on your mind? Share your entrepreneurial journey..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[120px] resize-none border-none p-0 focus-visible:ring-0"
                data-testid="input-post-content"
              />
              
              {imagePreview && (
                <div className="relative">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="max-w-full h-64 object-cover rounded-lg"
                    data-testid="img-post-preview"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="absolute top-2 right-2 bg-background/80"
                    onClick={() => setImagePreview(null)}
                    data-testid="button-remove-image"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center space-x-2">
              <label htmlFor="image-upload">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="hover-elevate"
                  data-testid="button-upload-image"
                >
                  <ImageIcon className="w-5 h-5" />
                </Button>
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <span 
                className={`text-sm ${remainingChars < 0 ? 'text-destructive' : remainingChars < 20 ? 'text-yellow-500' : 'text-muted-foreground'}`}
                data-testid="text-character-count"
              >
                {remainingChars}
              </span>
              
              <Button 
                type="submit" 
                disabled={!isValid || isLoading}
                className="hover-elevate"
                data-testid="button-submit-post"
              >
                {isLoading ? (
                  "Posting..."
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Post
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
        
        {/* Preview Section */}
        {content.trim() && (
          <div className="pt-4 border-t">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Preview:</h3>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">CU</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">Current User</p>
                    <p className="text-sm text-muted-foreground">Just now</p>
                    <p className="mt-2 text-sm" data-testid="text-post-preview">
                      {content}
                    </p>
                    {imagePreview && (
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="mt-3 max-w-full h-32 object-cover rounded-lg"
                      />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}