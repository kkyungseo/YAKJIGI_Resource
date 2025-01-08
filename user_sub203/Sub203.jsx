import React, { useEffect, useState } from "react";

// npm install echarts echarts-for-react 
// 라이브러리 설치 필요 (Echarts와 React 통합)

import commons from "../../styles/common.module.css";
import styles from "../../styles/sub203/sub203.module.css";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import * as echarts from "echarts";

function Sub203() {
   const { mainTitle, subTitle } = useDocumentTitle();
   const [chartData, setChartData] = useState(null);
   const [searchTerm, setSearchTerm] = useState("");
   const [searchResults, setSearchResults] = useState([]);
   const [prohibitionList, setProhibitionList] = useState([]);

   // 시각화 데이터 로딩 시작 
   useEffect(() => {
      fetch("/data/visualized_sub203_data.json")
         .then((response) => {
            if (!response.ok) throw new Error("Failed to fetch data");
            return response.json();
         })
         .then((data) => {
            if (!data || data.length === 0) {
               console.warn("No data available.");
               return;
            }

            const nodes = data.map((item, index) => ({
               id: index,
               name: item.product_name_a,
               symbolSize: 20,
               category: 0,
            }));

            const links = data.flatMap((item, index) =>
               item.sub_items.map((subItem, subIndex) => ({
                  source: index,
                  target: index + subIndex + 1,
                  value: subItem.prohibition_reason,
               }))
            );

            const categories = [
               { name: "Main Product" },
               { name: "Sub Product" },
            ];

            setChartData({ nodes, links, categories });
         })
         .catch((error) => console.error("Error loading chart data:", error));
   }, []);

   // 검색 기능
   const handleSearch = (e) => {
      e.preventDefault();
      if (!searchTerm) return;

      Promise.all([
         fetch("/data/all_medi_data.json").then((res) => res.json()),
         fetch("/data/grouped_sub203_data.json").then((res) => res.json()),
      ])
         .then(([allData, groupedData]) => {
            // 검색 결과  
            const matchedData = allData.filter((item) =>
               item.item_name.includes(searchTerm)
            );

            setSearchResults(
               matchedData.map((item) => ({
                  image: item.item_image,
                  name: item.item_name,
                  company: groupedData.find((g) =>
                     g.product_name_a.includes(item.item_name)
                  )?.company_name_a || "정보 없음",
                  ingredient: groupedData.find((g) =>
                     g.product_name_a.includes(item.item_name)
                  )?.ingredient_name_a || "정보 없음",
                  ingredientCode: groupedData.find((g) =>
                     g.product_name_a.includes(item.item_name)
                  )?.ingredient_code_a || "정보 없음",
                  category: groupedData.find((g) =>
                     g.product_name_a.includes(item.item_name)
                  )?.category_a || "정보 없음",
               }))
            );

            // 병용 금기 리스트  
            const prohibitionData =
               groupedData
                  .find((g) => g.product_name_a.includes(searchTerm))
                  ?.sub_items.map((subItem) => ({
                     productName: subItem.product_name_b,
                     company: subItem.company_name_b,
                     ingredient: subItem.ingredient_name_b,
                     reason: subItem.prohibition_reason,
                  })) || [];

            setProhibitionList(prohibitionData);
         })
         .catch((error) =>
            console.error("Error fetching search or prohibition data:", error)
         );
   };

   // 시각화 차트 초기화 (로딩 애니메이션)
   useEffect(() => {
      if (chartData) {
         const chartDom = document.getElementById("echart-container");
         const myChart = echarts.init(chartDom);

         const option = {
            tooltip: {},
            series: [
               {
                  type: "graph",
                  layout: "force",
                  force: { repulsion: 450, edgeLength: 300, gravity: 0.01 },
                  data: chartData.nodes,
                  links: chartData.links,
                  categories: chartData.categories,
                  roam: true,
                  label: { position: "right", formatter: "{b}", fontSize: 12 },
                  lineStyle: { color: "source", curveness: 0.3 },
               },
            ],
         };

         myChart.setOption(option);
         window.addEventListener("resize", myChart.resize);

         return () => {
            window.removeEventListener("resize", myChart.resize);
            myChart.dispose();
         };
      }
   }, [chartData]);

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
                  <form onSubmit={handleSearch}>
                     <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="약품명으로 검색하기"
                     />
                     <button className="material-icons">search</button>
                  </form>
               </div>
            </li>
         </ul>

         <div className={styles.content_container}>
            {/* 검색결과 */}
            <div className={styles.medi_result01}>
               <div className={styles.titlecount}>
                  <div className={styles.h3tag}>검색결과</div>
               </div>
               <div>
                  {searchResults.length > 0 ? (
                     searchResults.map((result, index) => (
                        <ul key={index} className={styles.medi_infos}>
                           <li className={styles.medi_image_contents}>
                              <img
                                 className={styles.image_medi}
                                 src={result.image}
                                 alt="약품 이미지 없음"
                              />
                           </li>
                           <li>
                              <p className={styles.medi_title}>{result.name}</p>
                              <ul className={styles.medi_contents}>
                                 <li className={styles.medi_info}>업소명</li>
                                 <li className={styles.medi_detail}>
                                    {result.company}
                                 </li>
                                 <li className={styles.medi_info}>성분명</li>
                                 <li className={styles.medi_detail}>
                                    {result.ingredient}
                                 </li>
                                 <li className={styles.medi_info}>성분코드</li>
                                 <li className={styles.medi_detail}>
                                    {result.ingredientCode}
                                 </li>
                                 <li className={styles.medi_info}>구분</li>
                                 <li className={styles.medi_detail}>
                                    {result.category}
                                 </li>
                              </ul>
                           </li>
                        </ul>
                     ))
                  ) : (
                     <p className={styles.search_message}>약품명을 검색해보세요</p>
                  )}
               </div>
            </div>

            <hr className={styles.hrddd} />

            {/* 병용금기 리스트 */}
            <div className={styles.medi_result01}>
               <div className={styles.titlecount}>
                  <div className={styles.h3tag}>병용금기 리스트</div>
                  <div className={styles.countnum}>
                     총 {prohibitionList.length}건
                  </div>
               </div>
               <div className={styles.medi_list}>
                  {prohibitionList.length > 0 ? (
                     <table className={styles.medi_table}>
                        <thead>
                           <tr>
                              <th>약품명</th>
                              <th>업소명</th>
                              <th>성분명</th>
                              <th>금기사유</th>
                           </tr>
                        </thead>
                        <tbody>
                           {prohibitionList.map((item, index) => (
                              <tr key={index}>
                                 <td>{item.productName}</td>
                                 <td>{item.company}</td>
                                 <td>{item.ingredient}</td>
                                 <td>{item.reason}</td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  ) : (
                     <p className={styles.prohibition_message}>
                        하단의 표에 약품명에 따른 병용금기 리스트가 표기됩니다
                     </p>
                  )}
               </div>
               <div className={styles.titlecount}>
                  <div className={styles.h3tag}>국내 범용금기 의약품 TOP 50</div>
               </div>
            </div>
         </div>
         {/* 시각화 차트 영역 */}
         <div className={styles.CHART_section}>
            <div id="echart-container" style={{ height: "600px" }}></div>
         </div>
      </>
   );
}

export default Sub203;
