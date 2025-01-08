import React, { useCallback, useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';

// npm install echarts echarts-for-react 
// 라이브러리 설치 필요 (Echarts와 React 통합)

import commons from '../../styles/common.module.css';
import styles from '../../styles/sub202/sub202.module.css';
import useDocumentTitle from '../../hooks/useDocumentTitle';

function Sub202(props) {
   const { mainTitle, subTitle } = useDocumentTitle();

   // 버튼의 상태들을 저장하는 배열
   const [buttonstates, setbuttonstates] = useState(Array(5).fill(false));
   const buttonclick = useCallback((index, event) => {
      event.preventDefault();
      setbuttonstates(prev => {
         const newstates = [...prev];
         newstates[index] = !newstates[index]; // 클릭한 버튼만 상태 반전 
         return newstates;
      });
   }, []);

   const buttonment = [
      "태아", "신생아", "유아", "임부", "노인"
   ];

   const [resultlist, setResultList] = useState([]);
   const [searchText, setSearchText] = useState(''); // 검색바 텍스트 상태 지정정

   // 시각화 데이터를 위한 상태
   const [chartData, setChartData] = useState([]);

   // JSON 데이터에 색상 추가 함수
   const applyColorsToCategories = useCallback((data, parentClass = null) => {
      const colorMapping = {
         "pregnancy": '#132E59',
         "senior": '#3A6ABD',
         "age": '#80CFEF',
         "default": '#ccc', // 기본 색상
      };

      return data.map((item) => {
         const currentClass = item.class || parentClass;
         const color = currentClass ? (colorMapping[currentClass] || colorMapping["default"]) : colorMapping["default"];

         return {
            ...item,
            itemStyle: {
               color: color, // 색상 적용
            },
            children: item.children
               ? applyColorsToCategories(item.children, currentClass) // 하위 노드에 상위 class 전달
               : []
         };
      });
   }, []);

   // JSON 데이터 불러오기 (시각화 데이터)
   useEffect(() => {
      fetch('/data/visualized_classify_sub202.json')
         .then((response) => response.json())
         .then((data) => {
            const coloredData = applyColorsToCategories(data);
            setChartData(coloredData);  // 색상이 적용된 데이터로 상태 설정
         })
         .catch((error) => console.error('Error loading JSON data:', error));
   }, [applyColorsToCategories]);

   // 검색 조건에 맞는 데이터 필터링 (교집합 방식)
   const filterSearchData = (conditions, searchText) => {
      fetch('/data/merged_sub202_data.json')
         .then((response) => response.json())
         .then((data) => {
            // 조건들이 전부 포함된 데이터를 필터링 (교집합 방식)
            const filteredData = data.filter(item => {
               return (
                  item.side_detail && item.side_detail.toLowerCase() !== 'null' && // side_detail이 null이 아니고
                  conditions.every(condition => item.side_detail.toLowerCase().includes(condition.toLowerCase())) && // 조건 만족
                  item.product_name.toLowerCase().includes(searchText.toLowerCase()) // 검색어와 일치
               );
            }).slice(0, 100); // 최대 100개로 제한 (속도향상 및 검색정확도 개선 위함함)

            // 결과를 가나다 순으로 정렬
            const sortedData = filteredData.sort((a, b) => {
               return a.product_name.localeCompare(b.product_name, 'ko', { sensitivity: 'base' });
            });

            setResultList(sortedData);
         })
         .catch((error) => console.error('Error loading search data:', error));
   };

   // 버튼 클릭 시 필터링
   useEffect(() => {
      const activeConditions = buttonstates
         .map((state, index) => (state ? buttonment[index] : null)) // 선택된 조건만 추출
         .filter(condition => condition !== null); // null 값은 제외

      // 선택된 조건과 검색바 텍스트로 필터링
      filterSearchData(activeConditions, searchText);
   }, [buttonstates, searchText]);

   // ECharts 옵션 정의
   const getOption = () => ({
      tooltip: {
         trigger: 'item',
         formatter: function (params) {
            return `${params.name}: ${params.value} 건`;
         }
      },
      legend: {
         orient: 'horizontal',
         left: 'center'
      },
      series: [
         {
            type: 'treemap',
            data: chartData,
            roam: false,
            label: {
               show: true,
               formatter: '{b} - {c} 건',
               fontSize: 14,
               color: '#fff',
            },
            itemStyle: {
               borderColor: '#fff',
               borderWidth: 1,
               opacity: 0.8,
            },
         },
      ],
   });

   // 검색바 입력 처리
   const handleSearchChange = (event) => {
      setSearchText(event.target.value); // 입력된 텍스트 상태 업데이트
   };

   return (
      <>
         <div className={commons.container__box__title}>
            <h2 className={commons.main_title}>{mainTitle}</h2>
            <p className={commons.sub_title}>{subTitle}</p>
         </div>

         {/* 검색바 */}
         <ul className={commons.common_search_container}>
            <li>
               <p>건강 조건으로 검색하기</p>
               <div className={styles.search_check}>
                  {buttonstates.map((k, index) => (
                     <button
                        key={index}
                        className={`${styles.search_box} ${buttonstates[index] ? styles.box_true : styles.box_false}`}
                        onClick={(event) => buttonclick(index, event)}
                     >
                        {buttonment[index]}
                     </button>
                  ))}
               </div>

               <p>검색어 검색</p>
               <div className={commons.common_search_div}>
                  <form name="" action="/">
                     <input
                        type="text"
                        name=""
                        id=""
                        value={searchText} // 텍스트 상태 바인딩
                        onChange={handleSearchChange} // 텍스트 입력 시 상태 변경
                        placeholder="의약품명 검색하기"
                     />
                     <button className="material-icons">search</button>
                  </form>
               </div>
            </li>
         </ul>

         <div className={styles.sub202__result}>
            <div className={styles.medi_result01}>
               <div className={styles.h3tag}>검색결과</div>
               <hr className={styles.hrtag} />
               <div className={commons.table_guide}>
                  <div className={commons.guide}>
                     좌우로 드래그 해주세요.
                  </div>
               </div>

               <div className={styles.medi_table} style={{ height: '360px', overflowY: 'auto' }}>
                  <table>
                     <thead>
                        <tr>
                           <th className={styles.tablecell}>약품명</th>
                           <th className={styles.tablecell}>부작용</th>
                        </tr>
                     </thead>
                     <tbody>
                        {resultlist.length > 0 ? (
                           resultlist.map((k, index) => (
                              <tr key={index}>
                                 <td className={styles.tablecell}>{k.product_name}</td>
                                 <td className={styles.tablecell}>{k.side_detail}</td>
                              </tr>
                           ))
                        ) : (
                           <tr>
                              <td colSpan="2" className={styles.no_data_message}>
                                 건강조건 혹은 약품명을 검색해보세요
                              </td>
                           </tr>
                        )}
                     </tbody>
                  </table>
               </div>
            </div>

            <div className={styles.CHART_section}>
               <div className={styles.titlecount}>
                  <div className={styles.h3tag}>국내 의약품 부작용 현황</div>
               </div>
               {/* 시각화 그래프 */}
               {chartData.length > 0 ? (
                  <ReactECharts option={getOption()} style={{ height: '600px', width: '100%' }} />
               ) : (
                  <p>부작용 시각화 데이터 로딩중입니다...</p>
               )}
            </div>
         </div>
      </>
   );
}

export default Sub202;
