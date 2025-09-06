import IMetric from "./IMetric";

interface IMetricListProps {
  metrics: IMetric[];
  page: number;
  totalPages: number;
}

export default IMetricListProps;
