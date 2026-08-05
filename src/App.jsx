import { useEffect } from "react";
import axiosInstance from "./api/axiosInstance";

function App() {
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await axiosInstance.get("/hello/");
        console.log("백엔드 연결 성공:", response.data);
      } catch (error) {
        console.error("백엔드 연결 실패:", error);
      }
    };

    checkBackend();
  }, []);

  return (
    <main>
      <h1>2026 멋사 해커톤</h1>
      <p>프론트엔드 초기 세팅 ㅎㅎ</p>
      <p>지연 지수 서연 성은 예은 지윤 화이팅~</p>
    </main>
  );
}

export default App;