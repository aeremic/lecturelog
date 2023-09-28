import { Injectable } from '@nestjs/common';
import { Exception } from 'handlebars';
import { parse } from 'papaparse';
import { CsvParseErrorConstants } from 'src/core/common/constants/error.constant';

@Injectable()
export class ParserService {
    parseFile(header: string[], file: Express.Multer.File): any {
        const parsedCsv = parse(file.buffer.toString(), {
            header: true,
            delimiter: ','
        });

        const fields = parsedCsv.meta.fields;
        const data: any = parsedCsv.data;

        if (fields && data) {
            const isHeaderValid = fields.length === header.length && fields.every((element, index) => element === header[index]);
            if (isHeaderValid) {
                return data;
            } else {
                throw new Exception(CsvParseErrorConstants.HeaderNotValid)
            }
        } else {
            throw new Exception(CsvParseErrorConstants.DataNotValid);
        }
    }
}