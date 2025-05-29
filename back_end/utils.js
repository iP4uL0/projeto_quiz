import bcrypt from "bcrypt";

export async function Criarhash(senha, salts) {
    const hash = await bcrypt.hash(senha, salts);
    return hash
}

export async function compararHash(senha, hash) {
    const teste = await bcrypt.compare(senha, hash)
    if (teste) {
        return true
    }
    else {
        return false
    }
}