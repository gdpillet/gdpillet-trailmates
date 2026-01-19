import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface DetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  title: string;
}

const DetailModal = ({ open, onOpenChange, children, title }: DetailModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-none w-full h-full max-h-full rounded-none border-0 p-0 overflow-y-auto"
        aria-describedby={undefined}
      >
        <VisuallyHidden>
          <DialogTitle>{title}</DialogTitle>
        </VisuallyHidden>
        
        {/* Close button */}
        <button
          onClick={() => onOpenChange(false)}
          className="fixed top-6 right-6 z-50 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-muted transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5 text-foreground" />
        </button>
        
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default DetailModal;
