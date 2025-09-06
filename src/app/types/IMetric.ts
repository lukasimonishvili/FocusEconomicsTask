interface IMetric {
  id: number;
  nombreDato: string;
  categoria: string;
  valor: number;
  unidad: string;
  fecha: string | Date;
}

export default IMetric;
