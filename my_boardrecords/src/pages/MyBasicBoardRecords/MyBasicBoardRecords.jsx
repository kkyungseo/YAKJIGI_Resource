import React from "react";
import styles from '../../styles/MyBasicBoardRecords/mybasicboardrecords.module.css';

function MyBasicBoardRecords(props) {

    // 더미 데이터 ~ 추후 실제 DB로 대체 
    // 반응형을 위해 12개 출력 
    const records = Array(12).fill({
        date: "2024년 00월 00일",
        phar: "OO 약국",
        image: "/images/mybasicboardrecords/records_1.jpg",
    });

    return (
        <section className={styles.mybasicboardrecords_container}>
            <div className={styles.records_grid}>
                {records.map((record, index) => (
                    <div className={styles.records_item} key={index}>
                        <img
                            src={record.image}
                            alt={`Record from ${record.date}`}
                            className={styles.record_img}
                        />
                        <div className={styles.records_text}>
                            <p>{record.date}</p>
                            <p>{record.phar}</p>
                        </div>
                    </div>
                ))}
            </div>

            <ul className={styles.paging_num_ul}>
                <li className={`material-icons ${styles.icon}`}>keyboard_double_arrow_left</li>
                <li className={`material-icons ${styles.icon}`}>chevron_left</li>
                <li className="active">1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <li className={`material-icons ${styles.icon}`}>chevron_right</li>
                <li className={`material-icons ${styles.icon}`}>keyboard_double_arrow_right</li>
            </ul>
        </section>
    );
}

export default MyBasicBoardRecords;
