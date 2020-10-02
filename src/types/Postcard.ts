import TextBlock from './TextBlock';

interface Postcard {
    imageUrl: string;
    rotation: number;
    width: number;
    height: number;
    textBlocks: TextBlock[];
}

export default Postcard;
