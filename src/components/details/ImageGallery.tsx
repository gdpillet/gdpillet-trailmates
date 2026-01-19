interface ImageGalleryProps {
  images: string[];
  title: string;
  showAddPhotos?: boolean;
  onAddPhotos?: () => void;
}

const ImageGallery = ({ images, title, showAddPhotos = true, onAddPhotos }: ImageGalleryProps) => {
  if (images.length === 0) return null;

  return (
    <div className="space-y-2.5">
      <div className="flex flex-wrap gap-2.5">
        {/* Main large image */}
        <div className="w-full aspect-square rounded-md overflow-hidden">
          <img
            src={images[0]}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Additional images grid */}
        {images.length > 1 && (
          <div className="w-full grid grid-cols-3 gap-2.5">
            {/* Second image - larger */}
            <div className="col-span-2 aspect-[16/10] rounded-md overflow-hidden">
              <img
                src={images[1]}
                alt="Gallery image"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Small images column */}
            <div className="flex flex-col gap-2.5">
              {images.slice(2, 4).map((img, idx) => (
                <div key={idx} className="aspect-square rounded-md overflow-hidden">
                  <img
                    src={img}
                    alt="Gallery image"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Bottom row */}
        {images.length > 4 && (
          <div className="w-full grid grid-cols-3 gap-2.5">
            {images.slice(4, 7).map((img, idx) => (
              <div key={idx} className="aspect-[4/3] rounded-md overflow-hidden">
                <img
                  src={img}
                  alt="Gallery image"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
      
      {showAddPhotos && (
        <button 
          onClick={onAddPhotos}
          className="text-primary text-sm font-medium hover:underline"
        >
          Add route photos
        </button>
      )}
    </div>
  );
};

export default ImageGallery;
