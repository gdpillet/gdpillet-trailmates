import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
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
        
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default DetailModal;
