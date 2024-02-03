import axios from 'axios'

export class ProductService {
    api_url: string

    constructor(api_url = import.meta.env.VITE_BACK_API) {
        this.api_url = api_url
    }

    public async deleteProduct(id: number): Promise<any> {
        const { data } = await axios.delete(`${this.api_url}/product/${id}`)
        return {
            ...data,
        }
    }

    public async getProduct(): Promise<any> {
        const { data } = await axios.get(`${this.api_url}/product`)
        return {
            ...data,
        }
    }

    public async createProduct(createSupplierData: any): Promise<any> {
        const { data } = await axios.post<any>(`${this.api_url}/product`, createSupplierData)

        return {
            ...data,
        }
    }
}
