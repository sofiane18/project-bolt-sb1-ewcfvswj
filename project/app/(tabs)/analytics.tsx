import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { BarChart, LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { mockAnalytics } from '@/data/analytics';

const screenWidth = Dimensions.get('window').width;

export default function AnalyticsScreen() {
  const barData = {
    labels: mockAnalytics.topProducts.map(p => p.name.slice(0, 10) + '...'),
    datasets: [
      {
        data: mockAnalytics.topProducts.map(p => p.count),
      },
    ],
  };

  const lineData = {
    labels: mockAnalytics.salesTrend.map(item => item.month),
    datasets: [
      {
        data: mockAnalytics.salesTrend.map(item => item.amount / 1000), // Convert to thousands for better display
        color: (opacity = 1) => `rgba(249, 115, 22, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ['Sales (Thousands DZD)'],
  };

  const chartConfig = {
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(15, 23, 42, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(100, 116, 139, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#F97316',
    },
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Analytics Dashboard</Text>
      </View>

      <View style={styles.metricsContainer}>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Total Sales</Text>
          <Text style={styles.metricValue}>{mockAnalytics.totalSales.toLocaleString()} DZD</Text>
          <Text style={styles.metricNote}>Based on completed orders</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Best Selling Item</Text>
          <Text style={styles.metricValue}>{mockAnalytics.bestSellingItem}</Text>
          <Text style={styles.metricNote}>By number of units sold</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Customer Repeat Rate</Text>
          <Text style={styles.metricValue}>{mockAnalytics.customerRepeatRate}%</Text>
          <Text style={styles.metricNote}>Customers who order more than once</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Average Rating</Text>
          <Text style={styles.metricValue}>{mockAnalytics.averageRating.toFixed(1)}/5.0</Text>
          <Text style={styles.metricNote}>Based on customer reviews</Text>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Low Stock Alerts</Text>
        {mockAnalytics.lowStockItems.map(item => (
          <View key={item.id} style={styles.alertCard}>
            <View>
              <Text style={styles.alertTitle}>{item.name}</Text>
              <Text style={styles.alertMessage}>Only {item.stock} units left in stock</Text>
            </View>
            <View style={styles.alertBadge}>
              <Text style={styles.alertBadgeText}>Restock</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Top Products by Sales</Text>
        <View style={styles.chartContainer}>
          <BarChart
            data={barData}
            width={screenWidth - 32}
            height={220}
            yAxisLabel=""
            yAxisSuffix=""
            chartConfig={chartConfig}
            style={styles.chart}
            verticalLabelRotation={30}
          />
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Sales Trend</Text>
        <View style={styles.chartContainer}>
          <LineChart
            data={lineData}
            width={screenWidth - 32}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#0F172A',
  },
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  metricCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    margin: 8,
    width: screenWidth / 2 - 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  metricLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#64748B',
    marginBottom: 8,
  },
  metricValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#0F172A',
    marginBottom: 4,
  },
  metricNote: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#94A3B8',
  },
  sectionContainer: {
    padding: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#0F172A',
    marginBottom: 16,
  },
  alertCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  alertTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#0F172A',
    marginBottom: 4,
  },
  alertMessage: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  alertBadge: {
    backgroundColor: '#FEF3C7',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  alertBadgeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#D97706',
  },
  chartContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 12,
  },
});