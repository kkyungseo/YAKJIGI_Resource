import React, { useEffect, useState } from 'react';

// npm install echarts echarts-for-react 
// 라이브러리 설치 필요 (Echarts와 React 통합)

import commons from '../../styles/common.module.css';
import styles from '../../styles/sub201/sub201.module.css';
import useDocumentTitle from '../../hooks/useDocumentTitle';

// 한글 초성 추출 함수
const getChosung = (text) => {
   const chosungList = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
   let chosung = '';

   for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i) - 0xac00;
      if (charCode >= 0 && charCode <= 11171) {
         chosung += chosungList[Math.floor(charCode / 588)];
      }
   }

   return chosung;
};

// 한글 정렬 함수
const sortDataByKorean = (data) => {
   return data.sort((a, b) => a.item_name.localeCompare(b.item_name, 'ko'));
};

function Sub201(props) {
   const { mainTitle, subTitle } = useDocumentTitle();

   const [searchText, setSearchText] = useState("");
   const [selectedLetter, setSelectedLetter] = useState("ㄱ");
   const [data, setData] = useState([]);  // 데이터를 저장하는 상태 추가
   const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가
   const [isTextSearch, setIsTextSearch] = useState(false);  // 텍스트 검색 여부 상태 추가
   const itemsPerPage = 12;  // 한 페이지에 표시할 아이템 수 (반응형 최적화를 위해 12개 설정정)

   // 데이터를 JSON 파일에서 불러오는 useEffect
   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await fetch('/data/all_medi_data.json');
            const jsonData = await response.json();
            setData(jsonData);  // 데이터를 상태에 저장
         } catch (error) {
            console.error("데이터를 불러오는 데 오류가 발생했습니다:", error);
         }
      };

      fetchData();
   }, []);

   // 필터링 및 정렬된 결과 생성
   const filteredResults = sortDataByKorean(
      data
         .filter((result) => {
            // 초성 검색이 활성화되어 있으면, 초성 필터링
            if (!isTextSearch) {
               const chosung = getChosung(result.item_name); // item_name(의약품명)에서 초성을 추출
               return chosung.startsWith(selectedLetter);    // 선택된 초성과 일치하는 항목만 필터링
            }
            return true; // 텍스트 검색이 활성화된 경우, 초성 필터링 제외
         })
         .filter((result) => {
            // 약품명 검색
            return result.item_name.toLowerCase().includes(searchText.toLowerCase());
         })
   );

   // 페이징을 위한 데이터 분할 처리리
   const totalResults = filteredResults.length;
   const totalPages = Math.ceil(totalResults / itemsPerPage);
   const paginatedResults = filteredResults.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
   );

   const handleSearchChange = (e) => {
      const text = e.target.value;
      setSearchText(text);
      // 텍스트가 없을 때, 초성 검색 활성화
      if (text === "") {
         setIsTextSearch(false);  // 텍스트가 없으면, 초성 검색이 활성화
      } else {
         setIsTextSearch(true);   // 텍스트가 있으면, 텍스트 검색이 활성화
         setSelectedLetter("");   // 텍스트 검색이 활성화되면, 초성 검색 버튼 강조색 제거
      }
   };

   const handleLetterClick = (letter) => {
      setSelectedLetter(letter);
      setSearchText("");  // 초성 버튼 클릭 시, 검색바 텍스트 삭제제
      setIsTextSearch(false); // 초성 버튼 클릭 시, 초성 검색 활성화
   };

   const handleSearchButtonClick = () => {
      setIsTextSearch(true); // 검색 버튼 클릭 시, 텍스트 검색 활성화
   };

   const handlePageChange = (pageNumber) => {
      if (pageNumber >= 1 && pageNumber <= totalPages) {
         setCurrentPage(pageNumber);
      }
   };

   // Material Icon : 아이콘 통일 설정
   useEffect(() => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
      document.head.appendChild(link);

      // Cleanup: 링크 태그를 제거하여 메모리 누수 방지
      return () => {
         document.head.removeChild(link);
      };
   }, []);

   // 페이징 번호 계산
   const pageNumbers = [];
   for (let i = 1; i <= totalPages; i++) {
      if (i <= 5) {  // 첫 5개 페이징 번호만 표시
         pageNumbers.push(i);
      }
   }

   return (
      <>
         <div className={commons.container__box__title}>
            <h2 className={commons.main_title}>{mainTitle}</h2>
            <p className={commons.sub_title}>{subTitle}</p>
         </div>

         {/* 검색바 */}
         <ul className={commons.common_search_container}>
            <li>
               <p>약품명 검색</p>

               <div className={commons.common_search_div}>
                  <form name="sub201__form" action="/#">
                     <input
                        type="text"
                        name="searchText"
                        id="searchText"
                        placeholder="약품명으로 검색하기"
                        value={searchText}
                        onChange={handleSearchChange}
                     />
                     <button
                        type="button"
                        className="material-icons"
                        onClick={handleSearchButtonClick}  // 검색 버튼 클릭 시, 텍스트 검색 활성화
                     >
                        search
                     </button>
                  </form>
               </div>

               <p>초성 검색</p>
               <div className={styles.search_check}>
                  <div className={styles.search_letter_filter}>
                     <ul>
                        {["ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅅ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"].map(
                           (letter) => (
                              <li key={letter}>
                                 <button
                                    className={selectedLetter === letter ? styles.active : ""}
                                    onClick={() => handleLetterClick(letter)}
                                    disabled={isTextSearch} // 텍스트 검색 활성화 시 초성 버튼 비활성화
                                 >
                                    {letter}
                                 </button>
                              </li>
                           )
                        )}
                     </ul>
                  </div>
               </div>
            </li>
         </ul>

         <section className={styles.result_section}>
            <p className={styles.result_text}>총 <span>{totalResults}</span>개의 결과가 있습니다.</p>
            <div className={styles.results_grid}>
               {paginatedResults.map((result, index) => (
                  <div key={index} className={styles.result_item}>
                     <img src={result.item_image} alt={result.item_name} />
                     <p className={styles.sub201__product__name}>{result.item_name}</p>
                     <p className={styles.sub201__volume}>{result.entp_name || '정보 없음'}</p>
                  </div>
               ))}
            </div>

            {/* paging 영역 start */}
            <div>
               <ul className={commons.paging_num_ul}>
                  <li
                     className="material-icons prev"
                     onClick={() => handlePageChange(currentPage - 1)}
                  >
                     keyboard_double_arrow_left
                  </li>
                  <li
                     className="material-icons prev"
                     onClick={() => handlePageChange(currentPage - 1)}
                  >
                     chevron_left
                  </li>
                  {pageNumbers.map((number) => (
                     <li
                        key={number}
                        className={currentPage === number ? commons.active : ""}
                        onClick={() => handlePageChange(number)}
                     >
                        {number}
                     </li>
                  ))}
                  <li
                     className="material-icons next"
                     onClick={() => handlePageChange(currentPage + 1)}
                  >
                     chevron_right
                  </li>
                  <li
                     className="material-icons next"
                     onClick={() => handlePageChange(currentPage + 1)}
                  >
                     keyboard_double_arrow_right
                  </li>
               </ul>
            </div>
            {/* paging 영역 end */}
         </section>
      </>
   );
}

export default Sub201;
