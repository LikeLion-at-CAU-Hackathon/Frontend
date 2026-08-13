// 제품 이미지를 와프 스타일로 보여주는 컴포넌트
function ProductImage({ alt, image }) {
  return (
    <div className="relative aspect-[393/242] w-full overflow-hidden bg-[#faf8f5]">
      <img
        src={image}
        alt={alt}
        className="absolute left-0 top-[-61.58%] h-[176.53%] w-full max-w-none object-cover"
      />
    </div>
  );
}

export default ProductImage;
