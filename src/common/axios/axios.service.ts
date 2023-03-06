import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class AxiosService {
  constructor(private configService: ConfigService) { }


  async createPaymentSource(createPaymentDto: any): Promise<any> {
    try {
      let baseUrl = this.configService.get<string>('REST_WOMPI_API_HOST')
      const { data } = await axios.post(`${baseUrl}/v1/payment_sources`, createPaymentDto,
        { headers: { 'Authorization': `Bearer ${this.configService.get<string>('WOMPI_SECRET_PRIVATE_KEY')}` } });
      return data;
    } catch (error) {
      console.log(error.response.data.error);
      throw error;
    }
  }
  async getPaymentSource(payment_source_id: number): Promise<any> {
    try {
      let baseUrl = this.configService.get<string>('REST_WOMPI_API_HOST')
      const { data } = await axios.get(`${baseUrl}/v1/payment_sources/${payment_source_id}`,
        { headers: { 'Authorization': `Bearer ${this.configService.get<string>('WOMPI_SECRET_PRIVATE_KEY')}` } });
      return data;
    } catch (error) {
      console.log(error.response.data.error);
      throw error;
    }
  }

  async createTransaction(type: string, payment_method_token: string, payment_source_id: string, acceptance_token: string, amount: number): Promise<any> {
    try {

      let body = {
        acceptance_token: acceptance_token,
        amount_in_cents: amount,
        currency: "COP",
        customer_email: "hdescorcias@gmail.com",
        payment_method: {
          type: type,
          token: payment_method_token,
          installments: 2
        },
        payment_source_id: payment_source_id,
        redirect_url: "https://mitienda.com.co/pago/resultado",
        reference: "TUPtdnVugyU40XlkhixhhGE6uYV2gh89",
        customer_data: {
          phone_number: "573016162926",
          full_name: "Hernan David Escorcia Samper",
          legal_id: "1234567890",
          legal_id_type: "CC"
        },
        shipping_address: {
          address_line_1: "Calle 34 # 56 - 78",
          address_line_2: "Apartamento 502, Torre I",
          country: "CO",
          region: "Atlantico",
          city: "Barranquilla",
          name: "Hernan Escorcia",
          phone_number: "573016162926",
          postal_code: "111111"
        }
      }

      let baseUrl = this.configService.get<string>('REST_WOMPI_API_HOST');

      const { data } = await axios.post(`${baseUrl}/v1/transactions`, body,
        { headers: { 'Authorization': `Bearer ${this.configService.get<string>('WOMPI_SECRET_PRIVATE_KEY')}` } });
      return data;
    } catch (error) {
      console.log(error.response.data.error);
      throw error;
    }
  }

}
