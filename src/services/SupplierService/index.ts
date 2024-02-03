import axios from 'axios'
import { type SupplierServiceInterface } from './Interfaces/SupplierServiceInterface'
import { type SupplierResponseType, type SupplierType } from './Types/SupplierType'

export class SupplierService implements SupplierServiceInterface {
    api_url: string

    api_via_cep: string

    constructor(api_url = import.meta.env.VITE_BACK_API) {
        this.api_url = api_url
        this.api_via_cep = 'https://viacep.com.br/ws/'
    }

    public async getCurrentSupplier(id: string): Promise<any> {
        const { data } = await axios.get(`${this.api_url}/supplier/${id}`)
        return {
            ...data,
        }
    }

    public async getSuppliers(): Promise<any> {
        const { data } = await axios.get(`${this.api_url}/supplier`)
        return {
            ...data,
        }
    }

    public async detachProduct(detachData: any): Promise<any> {
        const { data } = await axios.post(`${this.api_url}/supplier/detach-product`, detachData)
        return {
            ...data,
        }
    }

    public async deleteSupplier(id: number): Promise<any> {
        const { data } = await axios.delete(`${this.api_url}/supplier/${id}`)
        return {
            ...data,
        }
    }

    public async createSupplier(createSupplierData: SupplierType): Promise<SupplierResponseType> {
        const { data } = await axios.post<SupplierResponseType>(
            `${this.api_url}/supplier`,
            createSupplierData,
        )

        return {
            ...data,
        }
    }

    public async editSupplier(updateSupplierData: any, supplierId: number): Promise<any> {
        const { data } = await axios.put(
            `${this.api_url}/supplier/${supplierId}`,
            updateSupplierData,
        )

        return {
            ...data,
        }
    }

    public async getStreetByZipCode(zipCode: string): Promise<any> {
        const { data } = await axios.get(`${this.api_via_cep}/${zipCode}/json`)
        return {
            ...data,
        }
    }
}
