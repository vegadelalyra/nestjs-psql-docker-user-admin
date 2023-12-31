import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Role } from '../entities/role.entity'
import { CreateRoleDto } from '../dtos/create-role.dto'
import { UpdateRoleDto } from '../dtos/update-role.dto'

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    ) { }

    async createRole(createRolDto: CreateRoleDto): Promise<Role> {
        return await this.roleRepository.save(createRolDto)
    }

    async findAllRoles(): Promise<Role[]> {
        return await this.roleRepository.find()
    }

    async findRoleById(id: number): Promise<Role> {
        const role = await this.roleRepository.findOne({ where: {id} })
        if (!role) {
            throw new NotFoundException(`Role with ID ${id} not found.`)
        }   
        return role
    }

    async updateRole(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
        const role = await this.findRoleById(id)
        this.roleRepository.merge(role, updateRoleDto)
        return await this.roleRepository.save(role)
    }

    async deleteRole(id: number): Promise<void> {
        const role = await this.findRoleById(id)
        await this.roleRepository.remove(role)
    }
 }
