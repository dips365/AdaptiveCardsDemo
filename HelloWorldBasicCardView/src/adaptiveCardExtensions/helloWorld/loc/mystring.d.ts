declare interface IHelloWorldAdaptiveCardExtensionStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  TitleFieldLabel: string;
  IconPropertyFieldLabel: string;
  Title: string;
  SubTitle: string;
  Description: string;
  PrimaryText: string;
  QuickViewButton: string;
}

declare module 'HelloWorldAdaptiveCardExtensionStrings' {
  const strings: IHelloWorldAdaptiveCardExtensionStrings;
  export = strings;
}
