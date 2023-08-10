import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Doc from 'docx';

import { map, mergeMap, Observable, from } from 'rxjs';
import { Product } from 'src/app/models/Product/product.model';


@Injectable({
  providedIn: 'root'
})
export class DocService {

  constructor(private httpClient: HttpClient) { }

  // get image
  getImage(url: string): Observable<any> {
    return this.httpClient.get(url, { responseType: 'blob' }).pipe(mergeMap(res => {
      const bufferPromise = res.arrayBuffer();
      return from(bufferPromise).pipe(map(buffer => {
        return buffer;
      }))
    }))
  }

  // create a new document for product
  createDocument(productImage: ArrayBuffer, logo: ArrayBuffer, product: Product) {
    let document = new Doc.Document({
      sections: [
        {
          children: [
            new Doc.Paragraph({
              children: [
                new Doc.ImageRun({
                  data: logo,
                  transformation: {
                    width: 300,
                    height: 84,
                  },
                  floating: {
                    horizontalPosition: {
                      align: Doc.HorizontalPositionAlign.CENTER,
                    },
                    verticalPosition: {
                      relative: Doc.VerticalPositionRelativeFrom.LINE,
                      align: Doc.VerticalPositionAlign.INSIDE
                    },
                    wrap: {
                      type: Doc.TextWrappingType.TOP_AND_BOTTOM
                    },
                    allowOverlap: false
                  }
                })
              ]
            }), new Doc.Paragraph({
              children: [
                new Doc.ImageRun({
                  data: productImage,
                  transformation: {
                    width: 370,
                    height: 247,
                  },
                  floating: {
                    horizontalPosition: {
                      align: Doc.HorizontalPositionAlign.CENTER,
                    },
                    verticalPosition: {
                      relative: Doc.VerticalPositionRelativeFrom.LINE,
                      offset: 0
                    },
                    wrap: {
                      type: Doc.TextWrappingType.TOP_AND_BOTTOM
                    },
                    margins: {
                      bottom: 201440,
                    },
                    allowOverlap: false
                  },
                })
              ]
            }),
            new Doc.Paragraph({
              children: [
                new Doc.TextRun({
                  text: `${product.name}`,
                  size: 40,
                  bold: true,
                  break: 1
                })
              ]
            }),
            new Doc.Paragraph({
              children: [
                new Doc.TextRun({
                  text: 'Price: ',
                  bold: true,
                  break: 1
                }),
                new Doc.TextRun(`${product.price}`)
              ]
            }),
            new Doc.Paragraph({
              children: [
                new Doc.TextRun({
                  text: 'Description: ',
                  bold: true,
                  break: 1
                }),
                new Doc.TextRun(`${product.description}`)
              ]
            }),
            new Doc.Paragraph({
              children: [
                new Doc.TextRun({
                  text: 'Approximate Weight: ',
                  bold: true,
                  break: 1
                }),
                new Doc.TextRun(`${product.weight}`)
              ]
            }),
            new Doc.Paragraph({
              children: [
                new Doc.TextRun({
                  text: 'Approximate Size: ',
                  bold: true,
                  break: 1
                }),
                new Doc.TextRun(`${product.size}`)
              ]
            }),
            new Doc.Paragraph({
              children: [
                new Doc.TextRun({
                  text: 'Country of Origin: ',
                  bold: true,
                  break: 1
                }),
                new Doc.TextRun(`${product.origin}`)
              ]
            })
          ]
        }
      ]
    });
    return document;
  }
}
