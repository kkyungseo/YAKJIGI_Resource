import React, { useEffect, useState } from 'react';

import commons from '../../styles/common.module.css';
import styles from '../../styles/sub301/sub301.module.css';
import useDocumentTitle from '../../hooks/useDocumentTitle';

function Sub301(props) {
   const { mainTitle, subTitle } = useDocumentTitle();
   const [data, setData] = useState([]); // 데이터를 저장할 상태
   const [searchKeyword, setSearchKeyword] = useState(''); // 검색 키워드 상태
   const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
   const resultsPerPage = 10; // 한 페이지당 보여줄 결과 수

   // JSON 데이터를 불러오는 함수
   useEffect(() => {
      fetch('/data/filtered_sub301.json') // public 폴더를 기준으로 경로 설정
         .then((response) => {
            if (!response.ok) {
               throw new Error('Network response was not ok');
            }
            return response.json();
         })
         .then((data) => setData(data))
         .catch((error) => console.error('Error fetching data:', error));
   }, []);

   // 검색된 결과 필터링
   const filteredData = data
      .filter((item) =>
         searchKeyword
            ? item.phar_address && item.phar_address.includes(searchKeyword) // null 체크 추가
            : true // 검색어가 없을 경우 모두 표시
      )
      .sort((a, b) => a.phar_name.localeCompare(b.phar_name)); // 가나다순 정렬

   // 검색어가 없을 경우 최대 50개의 데이터만 표시
   const limitedData = searchKeyword ? filteredData : filteredData.slice(0, 50);

   // 현재 페이지에 해당하는 데이터만 추출
   const paginatedData = limitedData.slice(
      (currentPage - 1) * resultsPerPage,
      currentPage * resultsPerPage
   );

   // 총 페이지 수 계산 (limitedData 길이에 따라 계산)
   const totalPages = Math.ceil(limitedData.length / resultsPerPage);


   // 페이지 변경 함수
   const handlePageChange = (pageNumber) => {
      if (pageNumber < 1 || pageNumber > totalPages) return;
      setCurrentPage(pageNumber);
   };

   // 페이지 번호 배열 생성
   const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

   return (
      <>
         <div className={commons.container__box__title}>
            <h2 className={commons.main_title}>{mainTitle}</h2>
            <p className={commons.sub_title}>{subTitle}</p>
         </div>

         {/* 검색바 */}
         <ul className={commons.common_search_container}>
            <li>
               <p>초성 검색</p>
               <div className={commons.common_search_div}>
                  <form
                     onSubmit={(e) => {
                        e.preventDefault(); // 폼 제출 기본 동작 막기
                     }}
                  >
                     <input
                        type="text"
                        placeholder="지역명을 입력하세요 (예시 : 동대문, 일산)"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)} // 검색 키워드 업데이트
                     />
                     <button type="submit" className="material-icons">
                        search
                     </button>
                  </form>
               </div>
            </li>
         </ul>
         <div className={styles.sub_container2}>
            <ul className={styles.contents_box}>
               <li className={styles.textcenter}>
                  <div>
                     <ul className={styles.result_bar}>
                        <li>
                           총 <span>{filteredData.length}</span>개의 결과가 있습니다.
                        </li>
                     </ul>
                  </div>

                  <div className={styles.table_guide}>
                     <div className={styles.guide}>좌우로 드래그 해주세요.</div>
                  </div>

                  <div className={styles.table}>
                     <table className={styles.status_table}>
                        <thead>
                           <tr>
                              <th>약국명</th>
                              <th>주소</th>
                              <th>우편번호</th>
                           </tr>
                        </thead>
                        <tbody>
                           {paginatedData.map((item, index) => (
                              <tr key={index}>
                                 <td>{item.phar_name}</td>
                                 <td>
                                    <p>{item.phar_address}</p>
                                 </td>
                                 <td>{item.phar_address_num}</td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>

                  {/* 페이징 영역 */}
                  <div>
                     <ul className={commons.paging_num_ul}>
                        <li
                           className="material-icons prev"
                           onClick={() => handlePageChange(1)}
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
                              className={currentPage === number ? commons.active : ''}
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
                           onClick={() => handlePageChange(totalPages)}
                        >
                           keyboard_double_arrow_right
                        </li>
                     </ul>
                  </div>
               </li>
            </ul>
         </div>
      </>
   );
}

export default Sub301;
