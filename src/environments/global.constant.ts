export class GoldbalConstant {
  static GRID_OPTIONS = { SINGLE: 1, MULTIPLE: 2 };
  static STATUS_CODE = { SUCCESS: 0, FAILURE: 1 };

  /*树控制*/
  static TREE_OPTIONS = [
    { value: 'ALL', text: '全部子节点' },
    { value: 'CHILD', text: '子节点' },
    { value: 'SELF', text: '当前节点' },
  ];

  static NGB_BUTTON_ATTR = { _attr: '_attr', _value: 'value' };

  static ERROR_MESSAGE = {
    required: ' is required ',
    minlength: ' length is not enough ',
    maxlength: ' length out of range ',
    pattern: ' format is incorrect ',
  };

  static CRUD = {
    create: 'create',
    update: 'update',
    delete: 'delete',
    retrieve: 'retrieve',
  };
  static LOCATION = { nav: 'nav', row: 'row' };
  static VALIDATORS = { required: 'required', email: 'email' };
  static CRUD_NGBMODAL_REF = 'DataViewCreateComponent';
  /*修改类型*/
  static MODIFTY_TYPES = { hide: 'hide', enable: 'enable', disable: 'disable' };

  /*按钮操作 */
  static OPTIONS_BUTTON = {
    service: 'service',
    modal: 'modal',
    window: 'window',
  };
  static modal_size_lg: 'lg' | 'sm' = 'lg';
  static modal_size_sm: 'lg' | 'sm' = 'sm';

  /*排序类型*/
  static SORT_TYPES = [
    { value: null, text: '' },
    { value: 'ASC', text: 'ASC' },
    { value: 'DESC', text: 'DESC' },
  ];

  /*是否*/
  // static OPTION_WHETHER = [CHECK_WHETHER_YES, CHECK_WHETHER_NO];

  /*数据字典控件类型*/
  static DICT_COMPONENTTYPE = {
    hidden: 'hidden',
    radio: 'checkbox',
    textarea: 'textarea',
    dropdown: 'dropdown',
    text: 'text',
    datetimepicker: 'datetimepicker',
    upload: 'upload',
    selector: 'selector',
    code: 'code',
  };

  /*表达式*/
  static DICT_EXPRESSION = [
    { value: '=', text: '=' },
    { value: 'LIKE', text: 'LIKE' },
    { value: '>', text: '>' },
    { value: '>=', text: '>=' },
    { value: '<', text: '<' },
    { value: '<=', text: '<=' },
    { value: 'IS NULL', text: '为空' },
    { value: 'IS NOT NULL', text: '不为空' },
  ];

  /*选项*/
  static OPTION_MULTIPLE = [
    { value: '', text: '请选择' },
    { value: 0, text: '单选' },
    { value: 1, text: '多选' },
  ];

  /*表达式*/
  static WIN_SIZE = [
    { value: '', text: '请选择' },
    { value: 40, text: '40%' },
    { value: 50, text: '50%' },
    { value: 60, text: '60%' },
    { value: 70, text: '70%' },
    { value: 80, text: '80%' },
    { value: 90, text: '90%' },
    { value: 100, text: '100%' },
  ];
}
