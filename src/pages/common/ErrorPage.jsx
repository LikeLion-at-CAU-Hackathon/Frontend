import { ErrorModal } from "../../components/common";

// 공통 오류 모달 확인용 페이지
function ErrorPage() {
  return (
    <>
      <main className="min-h-full bg-[#faf8f5]" />
      <ErrorModal isOpen onClose={() => {}} />
    </>
  );
}

export default ErrorPage;
