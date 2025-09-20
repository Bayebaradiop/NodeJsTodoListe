export interface Icrud<T,Tcreate,Tupdate=Partial<Tcreate> ,Tkey=number>{
    

findAll():Promise<T[]>
findById(id:Tkey):Promise<T|null>
create(data:Tcreate):Promise<T>
update(id:Tkey ,data:Tupdate):Promise<T>
delete(id:Tkey):Promise<void>

}