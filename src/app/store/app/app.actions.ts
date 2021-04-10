export class SetAnalysisContext {
  public static readonly type = '[App] Set Analysis Context';
  constructor(public context: string, public viewId: string, public assetId?: string) { }
}

export class GetAllTemplates {
  public static readonly type = '[Template] GetAllTemplates';
}
