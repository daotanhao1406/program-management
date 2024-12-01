import { Text, View } from '@react-pdf/renderer';
import { styles } from '../PDFDocument';
import { useRequestWithState } from '../../../hooks/useRequest';
import { useEffect, useState } from 'react';

const SubjectAndOutputStandardDocument = () => {
  const { request } = useRequestWithState();

  const [dataSubject, setDataSubject] = useState<any[]>([]);

  const loadData = () => {
    request('/subjectCombination')
      .then((res) => {
        setDataSubject(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  const mapData = (subjectCombination: any[], type: string) => {
    let dataSubjectList: any[] = [];
    subjectCombination
      .filter((item) => item.type === type)
      .forEach((item: any) => {
        dataSubjectList = [...dataSubjectList, ...item.listSubjectDetails];
      });
    return dataSubjectList.map((item) => {
      if (Array.isArray(item.relationship)) {
        let relationshipObject: Record<any, string> = {};
        item.relationship.forEach((relationshipItem: any) => {
          let [key, value] = relationshipItem.code.split(':');
          relationshipObject[key] = value;
        });
        item.relationship = relationshipObject;
      }

      return item;
    });
  };

  const renderSubjectWithOutputStandard = (
    subjectCombination: any[],
    type: string
  ) => {
    return mapData(subjectCombination, type).map((item: any, index: number) => {
      return (
        <View style={{ ...styles.tableRow, borderLeft: '1px solid #000' }}>
          <View style={{ ...styles.tableCol, width: '5%' }}>
            <Text style={styles.tableCell}>{index + 1}</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '10%' }}>
            <Text style={styles.tableCell}>{item.subjectCode}</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '25%' }}>
            <Text style={{ ...styles.tableCell }}>{item.title}</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '7.5%' }}>
            <Text style={styles.tableCell}>{item?.relationship?.LO1}</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '7.5%' }}>
            <Text style={styles.tableCell}>{item?.relationship?.LO2}</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '7.5%' }}>
            <Text style={styles.tableCell}>{item?.relationship?.LO3}</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '7.5%' }}>
            <Text style={styles.tableCell}>{item?.relationship?.LO4}</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '7.5%' }}>
            <Text style={styles.tableCell}>{item?.relationship?.LO5}</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '7.5%' }}>
            <Text style={styles.tableCell}>{item?.relationship?.LO6}</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '7.5%' }}>
            <Text style={styles.tableCell}>{item?.relationship?.LO7}</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '7.5%' }}>
            <Text style={styles.tableCell}>{item?.relationship?.LO8}</Text>
          </View>
        </View>
      );
    });
  };
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={styles.title}>
        7 &nbsp; CÁC MÔN HỌC VÀ MỐI QUAN HỆ VỚI CHUẨN ĐẦU RA
      </Text>
      <Text style={styles.subtitle}>7.1. Các môn học đại cương</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={{ ...styles.tableCol, width: '5%' }}>
            <Text style={styles.tableCell}>STT</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '10%' }}>
            <Text style={styles.tableCell}>Mã môn học</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '25%' }}>
            <Text style={styles.tableCell}>Tên môn học</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '60%' }}>
            <Text style={styles.tableCell}>Chuẩn đầu ra</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={{ ...styles.tableCol, width: '5%' }}>
            <Text style={styles.tableCell}></Text>
          </View>
          <View style={{ ...styles.tableCol, width: '10%' }}>
            <Text style={styles.tableCell}></Text>
          </View>
          <View style={{ ...styles.tableCol, width: '25%' }}>
            <Text style={styles.tableCell}></Text>
          </View>
          <View style={{ ...styles.tableCol, width: '7.5%' }}>
            <Text style={styles.tableCell}>LO1</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '7.5%' }}>
            <Text style={styles.tableCell}>LO2</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '7.5%' }}>
            <Text style={styles.tableCell}>LO3</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '7.5%' }}>
            <Text style={styles.tableCell}>LO4</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '7.5%' }}>
            <Text style={styles.tableCell}>LO5</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '7.5%' }}>
            <Text style={styles.tableCell}>LO6</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '7.5%' }}>
            <Text style={styles.tableCell}>LO7</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '7.5%' }}>
            <Text style={styles.tableCell}>LO8</Text>
          </View>
        </View>
      </View>
      {renderSubjectWithOutputStandard(dataSubject, 'general')}
      <Text style={styles.subtitle}>7.2. Các môn học chuyên ngành</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={{ ...styles.tableCol, width: '5%' }}>
            <Text style={styles.tableCell}>STT</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '10%' }}>
            <Text style={styles.tableCell}>Mã môn học</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '25%' }}>
            <Text style={styles.tableCell}>Tên môn học</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '60%' }}>
            <Text style={styles.tableCell}>Chuẩn đầu ra</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={{ ...styles.tableCol, width: '5%' }}>
            <Text style={styles.tableCell}></Text>
          </View>
          <View style={{ ...styles.tableCol, width: '10%' }}>
            <Text style={styles.tableCell}></Text>
          </View>
          <View style={{ ...styles.tableCol, width: '25%' }}>
            <Text style={styles.tableCell}></Text>
          </View>
          <View style={{ ...styles.tableCol, width: '7.5%' }}>
            <Text style={styles.tableCell}>LO1</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '7.5%' }}>
            <Text style={styles.tableCell}>LO2</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '7.5%' }}>
            <Text style={styles.tableCell}>LO3</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '7.5%' }}>
            <Text style={styles.tableCell}>LO4</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '7.5%' }}>
            <Text style={styles.tableCell}>LO5</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '7.5%' }}>
            <Text style={styles.tableCell}>LO6</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '7.5%' }}>
            <Text style={styles.tableCell}>LO7</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '7.5%' }}>
            <Text style={styles.tableCell}>LO8</Text>
          </View>
        </View>
      </View>
      {renderSubjectWithOutputStandard(dataSubject, 'professional')}
      <Text style={styles.subtitle}>7.3. Các môn học tốt nghiệp</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={{ ...styles.tableCol, width: '5%' }}>
            <Text style={styles.tableCell}>STT</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '10%' }}>
            <Text style={styles.tableCell}>Mã môn học</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '25%' }}>
            <Text style={styles.tableCell}>Tên môn học</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '60%' }}>
            <Text style={styles.tableCell}>Chuẩn đầu ra</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={{ ...styles.tableCol, width: '5%' }}>
            <Text style={styles.tableCell}></Text>
          </View>
          <View style={{ ...styles.tableCol, width: '10%' }}>
            <Text style={styles.tableCell}></Text>
          </View>
          <View style={{ ...styles.tableCol, width: '25%' }}>
            <Text style={styles.tableCell}></Text>
          </View>
          <View style={{ ...styles.tableCol, width: '7.5%' }}>
            <Text style={styles.tableCell}>LO1</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '7.5%' }}>
            <Text style={styles.tableCell}>LO2</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '7.5%' }}>
            <Text style={styles.tableCell}>LO3</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '7.5%' }}>
            <Text style={styles.tableCell}>LO4</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '7.5%' }}>
            <Text style={styles.tableCell}>LO5</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '7.5%' }}>
            <Text style={styles.tableCell}>LO6</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '7.5%' }}>
            <Text style={styles.tableCell}>LO7</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '7.5%' }}>
            <Text style={styles.tableCell}>LO8</Text>
          </View>
        </View>
      </View>
      {renderSubjectWithOutputStandard(dataSubject, 'graduate')}
    </View>
  );
};

export default SubjectAndOutputStandardDocument;
