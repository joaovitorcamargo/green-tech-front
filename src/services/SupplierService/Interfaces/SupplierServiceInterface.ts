import { type SupplierResponseType, type SupplierType } from '../Types/SupplierType'

export interface SupplierServiceInterface {
    createSupplier(supplierData: SupplierType): Promise<SupplierResponseType>
}
