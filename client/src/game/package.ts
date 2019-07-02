/**
 * package
 */

 class Package {
    public static card : any = {};

    public static general : any = {};

    public static modes : any = {};

    public static init () {
        for (let k of Object.keys(Package.card)) {
            Package.card[k]();
        }
        for (let t of Object.keys(Package.general)) {
            Package.general[t]();
        }
        for (let s of Object.keys(Package.modes)) {
            Package.modes[s]();
        }
    }

    public name : string;

    public cardClasses : any = {};

    public skills : any = {};

    public generals : any = {};

    public askingTypeContents : any = {};

    public askings : any = {};
 }