export interface IVmPortfolio {
  portfolioId: number;
  headline: string;
  updatedDate: number;
  markdown: string;
  prevPortfolio?: IVmPortfolio;
  nextPortfolio?: IVmPortfolio;
}
