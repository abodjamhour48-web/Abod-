import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HistoryScreen = ({ navigation }) => {
  const { bendingHistory } = useSelector(state => state.machine);
  const { projects } = useSelector(state => state.projects);

  const renderHistoryItem = ({ item }) => (
    <View style={styles.historyItem}>
      <View style={styles.historyHeader}>
        <View style={styles.historyTitleContainer}>
          <Icon name="check-circle" size={24} color="#4CAF50" />
          <View style={styles.historyTitle}>
            <Text style={styles.historyTitleText}>عملية ثني</Text>
            <Text style={styles.historyDate}>
              {new Date(item.timestamp).toLocaleDateString('ar-SA')}
            </Text>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: '#4CAF50' }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      <View style={styles.historyDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>نوع السلك:</Text>
          <Text style={styles.detailValue}>{item.wireType}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>المدة:</Text>
          <Text style={styles.detailValue}>{item.duration} دقيقة</Text>
        </View>
      </View>
    </View>
  );

  const renderProjectItem = ({ item }) => (
    <TouchableOpacity style={styles.projectItem}>
      <Icon name="folder" size={24} color="#1976D2" />
      <View style={styles.projectItemContent}>
        <Text style={styles.projectItemName}>{item.name}</Text>
        <Text style={styles.projectItemDate}>
          {new Date(item.createdAt).toLocaleDateString('ar-SA')}
        </Text>
      </View>
      <Icon name="chevron-left" size={20} color="#999" />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* إحصائيات */}
      <View style={styles.statsCard}>
        <Text style={styles.cardTitle}>الإحصائيات</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Icon name="folder-multiple" size={28} color="#1976D2" />
            <Text style={styles.statLabel}>المشاريع</Text>
            <Text style={styles.statValue}>{projects.length}</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="repeat" size={28} color="#4CAF50" />
            <Text style={styles.statLabel}>العمليات</Text>
            <Text style={styles.statValue}>{bendingHistory.length}</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="clock" size={28} color="#FF9800" />
            <Text style={styles.statLabel}>الساعات</Text>
            <Text style={styles.statValue}>
              {bendingHistory.reduce((acc, item) => acc + item.duration, 0)}
            </Text>
          </View>
        </View>
      </View>

      {/* السجل الأخير */}
      {bendingHistory.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>سجل العمليات</Text>
          <FlatList
            data={bendingHistory}
            renderItem={renderHistoryItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        </View>
      )}

      {/* المشاريع */}
      {projects.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>المشاريع الحديثة</Text>
          <FlatList
            data={projects.slice(-5).reverse()}
            renderItem={renderProjectItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        </View>
      )}

      {/* رسالة فارغة */}
      {bendingHistory.length === 0 && projects.length === 0 && (
        <View style={styles.emptyState}>
          <Icon name="history" size={64} color="#ccc" />
          <Text style={styles.emptyStateText}>لا يوجد سجل</Text>
          <Text style={styles.emptyStateSubtext}>
            ستظهر العمليات والمشاريع هنا
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  statsCard: {
    backgroundColor: '#fff',
    margin: 12,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    gap: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  section: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  historyItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  historyTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  historyTitle: {
    flex: 1,
  },
  historyTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  historyDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  historyDetails: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTopHeight: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  detailLabel: {
    fontSize: 12,
    color: '#999',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  projectItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  projectItemContent: {
    flex: 1,
  },
  projectItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  projectItemDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#999',
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#bbb',
    marginTop: 8,
  },
});

export default HistoryScreen;
