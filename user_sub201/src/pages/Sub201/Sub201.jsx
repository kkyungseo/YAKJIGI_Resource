import React, { useState, useEffect } from "react";
import styles from '../../styles/Sub201/sub201.module.css';

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

function Sub201() {
    const [searchText, setSearchText] = useState("");
    const [selectedLetter, setSelectedLetter] = useState("ㄱ");

    // 더미 데이터 ~ 추후 API로 대체 (ㅈ 버튼 작동 확인 완료)
    // 반응형을 위해 12개 출력
    const results = Array(12).fill({
        name: "제품명 (제조사/성분명)",
        dosage: "20mg / 40mg / 60mg / 120mg",
        image: "/images/sub201/201_1.jpg",
    });

    // 결과의 총개수 ~ 추후 count로 대체
    const totalResults = 236;

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleLetterClick = (letter) => {
        setSelectedLetter(letter);
    };

    // 초성 검색 기능
    const filteredResults = results.filter((result) => {
        const chosung = getChosung(result.name);        // 제품명에서 초성을 추출
        return chosung.startsWith(selectedLetter);      // 선택된 초성과 일치하는 항목만 필터링
    });

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

    return (
        <div className={styles.Sub201}>
            {/* text_section & search_section & result_section */}
            <section className={styles.text_section}>
                <h1 className={styles.main_title}>의약품 검색하기</h1>
                <h3 className={styles.sub_title}>원하는 의약품 정보를 빠르게 찾아보세요</h3>
            </section>

            <section className={styles.search_section}>
                <div className={styles.search_stock}>
                    <p className={styles.search_text}>약품명 검색</p>
                    <div className={styles.search_bar}>
                        <div className={styles.search_div}>
                            <form name='sub201__form' action="/">
                                <input
                                    type="text"
                                    name="searchText"
                                    id="searchText"
                                    placeholder="약품명으로 검색하기"
                                    value={searchText}
                                    onChange={handleSearchChange}
                                />
                                <button className="material-icons">search</button>
                            </form>
                        </div>
                    </div>
                    <p className={styles.search_text}>초성 검색</p>
                    <div className={styles.search_letter_filter}>
                        {["ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅅ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"].map(
                            (letter) => (
                                <button
                                    key={letter}
                                    className={selectedLetter === letter ? styles.active : ""}
                                    onClick={() => handleLetterClick(letter)}
                                >
                                    {letter}
                                </button>
                            )
                        )}
                    </div>
                </div>
            </section>
            


            <section className={styles.result_section}>
                <p className={styles.result_text}>총 {totalResults}개의 결과가 있습니다.</p>
                <div className={styles.results_grid}>
                    {filteredResults.map((result, index) => (
                        <div key={index} className={styles.result_item}>
                            <img src={result.image} alt={result.name} />
                            <p>{result.name}</p>
                            <p>{result.dosage}</p>
                        </div>
                    ))}
                </div>

                <div>
                    <ul className={styles.paging_num_ul}>
                        <li className="material-icons prev">keyboard_double_arrow_left</li>
                        <li className="material-icons prev">chevron_left</li>
                        <li className="active">1</li>
                        <li>2</li>
                        <li>3</li>
                        <li>4</li>
                        <li>5</li>
                        <li className="material-icons next">chevron_right</li>
                        <li className="material-icons next">keyboard_double_arrow_right</li>
                    </ul>
                </div>
            </section>
        </div>
    );
}

export default Sub201;
