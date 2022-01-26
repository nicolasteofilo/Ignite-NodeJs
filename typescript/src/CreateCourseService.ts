interface Couser {
    name: string;
    duration?: number;
    educator: string;
}

class CreateCouseService {
    execute({ duration = 8 , educator, name }: Couser) {
        console.table({ duration, educator, name });
        return 'Course created';
    }
}

export default new CreateCouseService;