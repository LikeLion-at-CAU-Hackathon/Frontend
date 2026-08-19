// 제품 이미지를 와프 스타일로 보여주는 컴포넌트
function ProductImage({ alt, image, imageView = {} }) {
  const PRODUCT_DETAIL_IMAGE_SCALE = 1.5;
  const {
    fit = "contain",
    position = "center",
    scale = 1,
    translateY = "0px",
  } = imageView;
  const displayScale = scale * PRODUCT_DETAIL_IMAGE_SCALE;
  const isHoboBag = /hobo|호보/i.test(String(alt ?? ""));
  const displayTranslateY = isHoboBag ? "-70px" : translateY;

  return (
    <div className="relative aspect-[393/242] w-full overflow-hidden bg-[#faf8f5]">
      {image && (
        <img
          src={image}
          alt={alt}
          className="absolute inset-0 size-full max-w-none"
          style={{
            objectFit: fit,
            objectPosition: position,
            transform: `translateY(${displayTranslateY}) scale(${displayScale})`,
          }}
        />
      )}
    </div>
  );
}

export default ProductImage;
