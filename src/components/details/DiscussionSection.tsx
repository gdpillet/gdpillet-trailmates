import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface Comment {
  author: string;
  avatar: string;
  text: string;
  time: string;
}

interface DiscussionSectionProps {
  comments: Comment[];
  totalComments?: number;
}

const DiscussionSection = ({ comments, totalComments }: DiscussionSectionProps) => {
  const remaining = totalComments ? totalComments - comments.length : 0;

  return (
    <div>
      <h3 className="text-foreground text-lg font-bold mb-4">Discussion</h3>
      <div className="space-y-4">
        {comments.map((comment, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex gap-3">
              <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarImage src={comment.avatar} alt={comment.author} />
                <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">
                  <span className="font-semibold text-primary">{comment.author}</span>{' '}
                  {comment.text}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 ml-11 text-xs">
              <button className="text-primary hover:underline">Like</button>
              <span className="text-muted-foreground">·</span>
              <button className="text-primary hover:underline">Reply</button>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">{comment.time}</span>
            </div>
          </div>
        ))}
      </div>
      
      {remaining > 0 && (
        <button className="mt-4 text-sm text-primary hover:underline text-right w-full">
          + {remaining} comments
        </button>
      )}
    </div>
  );
};

export default DiscussionSection;
