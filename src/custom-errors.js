export class FsOperaionError extends Error {
    constructor(originalError){
        super("FS operation failed")
        this.name = "FsOperaionError"
        this.originalError = originalError
    }
}

export class UnexpectedError extends Error {
    constructor(originalError){
        super("Unexpected error occurred")
        this.name = "UnexpectedError"
        this.originalError = originalError
    }
}

export class RelativePathError extends Error  {
    constructor(originalError){
        super("Relative path must be provided")
        this.name = "RelativePathError"
        this.originalError = originalError
    }
}


export const EEXIST_ERROR_CODE = 'EEXIST'

export const ENOENT_ERROR_CODE = 'ENOENT'