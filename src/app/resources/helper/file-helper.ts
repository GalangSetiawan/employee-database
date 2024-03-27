import * as FileSaver from 'file-saver';
import { mimeTypes } from 'mime-wrapper';
import { ObjectHelper } from './object-helper';

export class FileHelper {

  public static saveExcelFileWithoutTimeInFilename(file: any, fileType: string, fileName: string, fileExtension: string) {
    const blob = new Blob([this.getBlob(file)], { type: fileType ? fileType : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    FileSaver.saveAs(blob, fileName + '.' + fileExtension);
  }

  public static saveExcelFile(file: any, fileType: string, fileName: string, fileExtension: string) {
    const blob = new Blob([this.getBlob(file)], { type: fileType ? fileType : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    FileSaver.saveAs(blob, fileName + '-' + new Date().getTime() + '.' + fileExtension);
  }


  public static saveFileWithoutTimeInFilename(file: string, fileName: string, fileExtension: string){

    // set valid fileName without extension
    var tempFileName = '';
    var tempExt: string | any = this.getExtensionFromFileName(fileName);
    if(tempExt != fileName){
      var isFileName = this.getMimeTypeFromExtension(tempExt)
        if(isFileName == tempExt){
          tempFileName = fileName
        }else{
          var lengthFileName = fileName.length;
          var lengthExtension = tempExt.length + 1;
          tempFileName = fileName.substring(0,lengthFileName-lengthExtension);
        }
    }else{
      tempFileName = fileName;
    }
    
    // set valid extension
    var tempFileExtension = null;
    if(fileExtension.includes('/')){
      var findExt = mimeTypes.getExtension(fileExtension);
      if(!ObjectHelper.isEmpty(findExt)) tempFileExtension = findExt;
      else{
        if(fileName.includes('.')) tempFileExtension = fileName.split('.').pop()
      }
    }else{
      tempFileExtension = fileExtension;
    }

    // cek apakah fileExtension berbentuk mimeType
    var isHaveMimeType:boolean | any = null;
    if(fileExtension.includes('/')) isHaveMimeType = true;
    else isHaveMimeType = false;

    // generate file download
    if (String(file).includes('base64')) {
      const link = document.createElement('a');
      link.href = file;
      link.download = tempFileName + '.' + tempFileExtension;
      link.click();
    }else{
      const link = document.createElement('a');
      if(isHaveMimeType){
        var base64File = 'data:'+ fileExtension +';base64,'+ file
      }else{
        var base64File = 'data:application/octet-stream;base64,'+ file
      }
      link.href = base64File;
      link.download = tempFileName + '.' + tempFileExtension;
      link.click();
    }

  }

  public static saveFile(file: any, fileType: string, fileName: string, fileExtension: string) {
    if (ObjectHelper.isEmpty(file)) {
      return;
    }

    if (String(file).includes('base64')) {
      const link = document.createElement('a');
      const extension = mimeTypes.getExtension(fileExtension);

      link.href = file;
      link.download = fileName + '-' + new Date().getTime() + '.' + extension;
      link.click();
    } else {
      const blob = new Blob([this.getBlob(file)], { type: fileType ? fileType : 'application/pdf' });
      const extension = mimeTypes.getExtension(fileExtension);
      FileSaver.saveAs(blob, fileName + '-' + new Date().getTime() + '.' + extension);
    }
  }

  public static saveBase64File(file: any, fileName: string, fileExtension: string) {
    if (ObjectHelper.isEmpty(file)) {
      return;
    }

    if (String(file).includes('base64')) {
      const link = document.createElement('a');

      link.href = file;
      link.download = fileName + '-' + new Date().getTime() + '.' + fileExtension;
      link.click();
    }else{
      const link = document.createElement('a');

      var base64File = 'data:application/octet-stream;base64,'+ file
      link.href = base64File;
      link.download = fileName + '-' + new Date().getTime() + '.' + fileExtension;
      link.click();
    }
  }

  public static saveTextFile(file: any, fileType: string, fileName: string, fileExtension: string) {
    if (ObjectHelper.isEmpty(file)) {
      return;
    }

    if (String(file).includes('base64')) {
      const link = document.createElement('a');
      const extension = mimeTypes.getExtension(fileExtension);

      link.href = file;
      link.download = fileName;
      link.click();
    } else {
      const blob = new Blob([this.getBlob(file)], { type: fileType ? fileType : 'application/pdf' });
      const extension = mimeTypes.getExtension(fileExtension);
      FileSaver.saveAs(blob, fileName);
    }
  }

  public static getExtensionFromFileName(fileName: string){
    return fileName.split('.').pop();
  }

  public static getExtension(fileExtension: string) {
    return mimeTypes.getExtension(fileExtension);
  }

  private static getBlob(base64String: string) {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    return new Uint8Array(byteNumbers);
  }

  public static getBase64Size(base64String: string) {
    let bytes = 0;
    if (base64String.substr(base64String.length - 2, 2) === '==') {
      bytes = (base64String.length * (3 / 4)) - 2;
    } else if (base64String.substr(base64String.length - 1, 1) === '=') {
      bytes = (base64String.length * (3 / 4)) - 1;
    } else {
      bytes = (base64String.length * (3 / 4));
    }
    return bytes;
  }

  public static getBase64String(contentType: string, content: string) {
    return 'data:' + contentType + ';base64,' + content;
  }
  public static getMimeTypeFromExtension(extName:string){
    // source : https://dirask.com/posts/JavaScript-get-MIME-Type-by-file-extension-prVMxp
    const types = {
      //   File Extension   MIME Type
        'abs':           'audio/x-mpeg',
        'ai':            'application/postscript',
        'aif':           'audio/x-aiff',
        'aifc':          'audio/x-aiff',
        'aiff':          'audio/x-aiff',
        'aim':           'application/x-aim',
        'art':           'image/x-jg',
        'asf':           'video/x-ms-asf',
        'asx':           'video/x-ms-asf',
        'au':            'audio/basic',
        'avi':           'video/x-msvideo',
        'avx':           'video/x-rad-screenplay',
        'bcpio':         'application/x-bcpio',
        'bin':           'application/octet-stream',
        'bmp':           'image/bmp',
        'body':          'text/html',
        'cdf':           'application/x-cdf',
        'cer':           'application/pkix-cert',
        'class':         'application/java',
        'cpio':          'application/x-cpio',
        'csh':           'application/x-csh',
        'css':           'text/css',
        'dib':           'image/bmp',
        'doc':           'application/msword',
        'dtd':           'application/xml-dtd',
        'dv':            'video/x-dv',
        'dvi':           'application/x-dvi',
        'eot':           'application/vnd.ms-fontobject',
        'eps':           'application/postscript',
        'etx':           'text/x-setext',
        'exe':           'application/octet-stream',
        'gif':           'image/gif',
        'gtar':          'application/x-gtar',
        'gz':            'application/x-gzip',
        'hdf':           'application/x-hdf',
        'hqx':           'application/mac-binhex40',
        'htc':           'text/x-component',
        'htm':           'text/html',
        'html':          'text/html',
        'ief':           'image/ief',
        'jad':           'text/vnd.sun.j2me.app-descriptor',
        'jar':           'application/java-archive',
        'java':          'text/x-java-source',
        'jnlp':          'application/x-java-jnlp-file',
        'jpe':           'image/jpeg',
        'jpeg':          'image/jpeg',
        'jpg':           'image/jpeg',
        'js':            'application/javascript',
        'jsf':           'text/plain',
        'json':          'application/json',
        'jspf':          'text/plain',
        'kar':           'audio/midi',
        'latex':         'application/x-latex',
        'm3u':           'audio/x-mpegurl',
        'mac':           'image/x-macpaint',
        'man':           'text/troff',
        'mathml':        'application/mathml+xml',
        'me':            'text/troff',
        'mid':           'audio/midi',
        'midi':          'audio/midi',
        'mif':           'application/x-mif',
        'mov':           'video/quicktime',
        'movie':         'video/x-sgi-movie',
        'mp1':           'audio/mpeg',
        'mp2':           'audio/mpeg',
        'mp3':           'audio/mpeg',
        'mp4':           'video/mp4',
        'mpa':           'audio/mpeg',
        'mpe':           'video/mpeg',
        'mpeg':          'video/mpeg',
        'mpega':         'audio/x-mpeg',
        'mpg':           'video/mpeg',
        'mpv2':          'video/mpeg2',
        'ms':            'application/x-wais-source',
        'nc':            'application/x-netcdf',
        'oda':           'application/oda',
        'odb':           'application/vnd.oasis.opendocument.database',
        'odc':           'application/vnd.oasis.opendocument.chart',
        'odf':           'application/vnd.oasis.opendocument.formula',
        'odg':           'application/vnd.oasis.opendocument.graphics',
        'odi':           'application/vnd.oasis.opendocument.image',
        'odm':           'application/vnd.oasis.opendocument.text-master',
        'odp':           'application/vnd.oasis.opendocument.presentation',
        'ods':           'application/vnd.oasis.opendocument.spreadsheet',
        'odt':           'application/vnd.oasis.opendocument.text',
        'otg':           'application/vnd.oasis.opendocument.graphics-template',
        'oth':           'application/vnd.oasis.opendocument.text-web',
        'otp':           'application/vnd.oasis.opendocument.presentation-template',
        'ots':           'application/vnd.oasis.opendocument.spreadsheet-template',
        'ott':           'application/vnd.oasis.opendocument.text-template',
        'ogx':           'application/ogg',
        'ogv':           'video/ogg',
        'oga':           'audio/ogg',
        'ogg':           'audio/ogg',
        'otf':           'application/x-font-opentype',
        'spx':           'audio/ogg',
        'flac':          'audio/flac',
        'anx':           'application/annodex',
        'axa':           'audio/annodex',
        'axv':           'video/annodex',
        'xspf':          'application/xspf+xml',
        'pbm':           'image/x-portable-bitmap',
        'pct':           'image/pict',
        'pdf':           'application/pdf',
        'pgm':           'image/x-portable-graymap',
        'pic':           'image/pict',
        'pict':          'image/pict',
        'pls':           'audio/x-scpls',
        'png':           'image/png',
        'pnm':           'image/x-portable-anymap',
        'pnt':           'image/x-macpaint',
        'ppm':           'image/x-portable-pixmap',
        'ppt':           'application/vnd.ms-powerpoint',
        'pps':           'application/vnd.ms-powerpoint',
        'ps':            'application/postscript',
        'psd':           'image/vnd.adobe.photoshop',
        'qt':            'video/quicktime',
        'qti':           'image/x-quicktime',
        'qtif':          'image/x-quicktime',
        'ras':           'image/x-cmu-raster',
        'rdf':           'application/rdf+xml',
        'rgb':           'image/x-rgb',
        'rm':            'application/vnd.rn-realmedia',
        'roff':          'text/troff',
        'rtf':           'application/rtf',
        'rtx':           'text/richtext',
        'sfnt':          'application/font-sfnt',
        'sh':            'application/x-sh',
        'shar':          'application/x-shar',
        'sit':           'application/x-stuffit',
        'snd':           'audio/basic',
        'src':           'application/x-wais-source',
        'sv4cpio':       'application/x-sv4cpio',
        'sv4crc':        'application/x-sv4crc',
        'svg':           'image/svg+xml',
        'svgz':          'image/svg+xml',
        'swf':           'application/x-shockwave-flash',
        't':             'text/troff',
        'tar':           'application/x-tar',
        'tcl':           'application/x-tcl',
        'tex':           'application/x-tex',
        'texi':          'application/x-texinfo',
        'texinfo':       'application/x-texinfo',
        'tif':           'image/tiff',
        'tiff':          'image/tiff',
        'tr':            'text/troff',
        'tsv':           'text/tab-separated-values',
        'ttf':           'application/x-font-ttf',
        'txt':           'text/plain',
        'ulw':           'audio/basic',
        'ustar':         'application/x-ustar',
        'vxml':          'application/voicexml+xml',
        'xbm':           'image/x-xbitmap',
        'xht':           'application/xhtml+xml',
        'xhtml':         'application/xhtml+xml',
        'xls':           'application/vnd.ms-excel',
        'xml':           'application/xml',
        'xpm':           'image/x-xpixmap',
        'xsl':           'application/xml',
        'xslt':          'application/xslt+xml',
        'xul':           'application/vnd.mozilla.xul+xml',
        'xwd':           'image/x-xwindowdump',
        'vsd':           'application/vnd.visio',
        'wav':           'audio/x-wav',
        'wbmp':          'image/vnd.wap.wbmp',
        'wml':           'text/vnd.wap.wml',
        'wmlc':          'application/vnd.wap.wmlc',
        'wmls':          'text/vnd.wap.wmlsc',
        'wmlscriptc':    'application/vnd.wap.wmlscriptc',
        'wmv':           'video/x-ms-wmv',
        'woff':          'application/font-woff',
        'woff2':         'application/font-woff2',
        'wrl':           'model/vrml',
        'wspolicy':      'application/wspolicy+xml',
        'z':             'application/x-compress',
        'zip':           'application/zip'
    };


    var result = eval(`types.${extName}`);
    if(ObjectHelper.isEmpty(result)) return extName;
    else return result
  }
}
