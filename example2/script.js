
(function () {
  // DOM VERTICAL MINI MAP

  const createMap = function (map) {
    if (map != null) {
      let mapElement = map.root

      if (mapElement == null) {
        map.create()
      }
    }
  };

  const config = {
    styles: {
      width: '5rem'
    },
    points: [
      {
        draw: {
          selector: 'div.dx-show-invalid-badge.dx-invalid',
        },
        focus: {
          enabled: true,
        },
        scroll: {
          type: 'top'
        },
        titleConstructor: [
          {
            selector: 'span[data-mark]',
            textContent: true
          }
        ]
      },
      {
        draw: {
          selector: 'div.dx-checkbox.dx-invalid',
        },
        focus: {
          enabled: true,
        },
        scroll: {
          type: 'top'
        },
        titleConstructor: [
          {
            selector: 'span.dx-checkbox-text',
            textContent: true
          }
        ]
      },
    ]
  };

  const miniMap = new DomVerticalMiniMap(config);

  // DATA

  const formData = {
    Email: '',
    Password: '',
    Name: 'Peter',
    Date: null,
    BillingCountry: '',
    BillingCity: '',
    BillingAddress: '',
    ShippingCountry: '',
    ShippingCity: '',
    ShippingAddress: '',
    Phone: '',
    Accepted: false,
  };
  const countries = ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'The Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burma', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Democratic Republic of the Congo', 'Republic of the Congo', 'Costa Rica', 'Ivory Coast', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'The Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Republic of Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'North Korea', 'South Korea', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Republic of Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Federated States of Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Namibia', 'Nauru', 'Nepal', 'Kingdom of the Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palau', 'State of Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'São Tomé and Príncipe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'];
  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Philadelphia', 'Phoenix', 'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Indianapolis', 'Jacksonville', 'San Francisco', 'Columbus', 'Charlotte', 'Fort Worth', 'Detroit', 'El Paso', 'Memphis', 'Seattle', 'Denver', 'Washington', 'Boston', 'Nashville', 'Baltimore', 'Oklahoma City', 'Louisville', 'Portland', 'Las Vegas', 'Milwaukee', 'Albuquerque', 'Tucson', 'Fresno', 'Sacramento', 'Long Beach', 'Kansas City', 'Mesa', 'Virginia Beach', 'Atlanta', 'Colorado Springs', 'Omaha', 'Raleigh', 'Miami', 'Oakland', 'Minneapolis', 'Tulsa', 'Cleveland', 'Wichita', 'Arlington', 'New Orleans', 'Bakersfield', 'Tampa', 'Honolulu', 'Aurora', 'Anaheim', 'Santa Ana', 'St. Louis', 'Riverside', 'Corpus Christi', 'Lexington', 'Pittsburgh', 'Anchorage', 'Stockton', 'Cincinnati', 'Saint Paul', 'Toledo', 'Greensboro', 'Newark', 'Plano', 'Henderson', 'Lincoln', 'Buffalo', 'Jersey City', 'Chula Vista', 'Fort Wayne', 'Orlando', 'St. Petersburg', 'Chandler', 'Laredo', 'Norfolk', 'Durham', 'Madison', 'Lubbock', 'Irvine', 'Winston–Salem', 'Glendale', 'Garland', 'Hialeah', 'Reno', 'Chesapeake', 'Gilbert', 'Baton Rouge', 'Irving', 'Scottsdale', 'North Las Vegas', 'Fremont', 'Boise', 'Richmond'];

  // FORM

  $('#form-container').on('submit', (event) => {
    DevExpress.ui.notify({
      message: 'You have submitted the form',
      position: {
        my: 'center top',
        at: 'center top',
      },
    }, 'success', 3000);

    event.preventDefault();
  });

  const sendRequest = function (value) {
    const invalidEmail = 'test@dx-email.com';
    const d = $.Deferred();
    setTimeout(() => { d.resolve(value !== invalidEmail); }, 1000);
    return d.promise();
  };

  const changePasswordMode = function (name) {
    const editor = formWidget.getEditor(name);
    editor.option('mode', editor.option('mode') === 'text' ? 'password' : 'text');
  };

  const formWidget = $('#form').dxForm({
    formData: formData,
    labelMode: 'floating',
    onInitialized: () => { createMap(miniMap); },
    readOnly: false,
    showColonAfterLabel: true,
    showValidationSummary: true,
    validationGroup: 'customerData',
    width: '60%',
    items: [
      {
        itemType: 'group',
        caption: 'Credentials',
        items: [
          {
            dataField: 'Email',
            validationRules: [
              { type: 'required', message: 'Email is required', },
              { type: 'email', message: 'Email is invalid', },
              {
                type: 'async',
                message: 'Email is already registered',
                validationCallback: (params) => sendRequest(params.value),
              },
            ],
          },
          {
            dataField: 'Password',
            editorOptions: {
              mode: 'password',
              onValueChanged: () => {
                const editor = formWidget.getEditor('ConfirmPassword');
                if (editor.option('value')) { editor.element().dxValidator('validate'); }
              },
              buttons: [
                {
                  name: 'password',
                  location: 'after',
                  options: {
                    icon: 'eyeopen',
                    onClick: () => changePasswordMode('Password'),
                    stylingMode: 'text',
                    type: 'normal',
                  },
                },
              ],
            },
            validationRules: [
              { type: 'required', message: 'Password is required', },
            ],
          },
          {
            name: 'ConfirmPassword',
            label: { text: 'Confirm Password', },
            editorType: 'dxTextBox',
            editorOptions: {
              mode: 'password',
              buttons: [
                {
                  name: 'password',
                  location: 'after',
                  options: {
                    icon: 'eyeopen',
                    onClick: () => changePasswordMode('ConfirmPassword'),
                    stylingMode: 'text',
                    type: 'normal',
                  },
                },
              ],
            },
            validationRules: [
              {
                type: 'required',
                message: 'Confirm Password is required',
              },
              {
                type: 'compare',
                message: "'Password' and 'Confirm Password' do not match",
                comparisonTarget: () => formWidget.option('formData').Password,
              },
            ],
          },
        ],
      },
      {
        itemType: 'group',
        caption: 'Personal Data',
        items: [
          {
            dataField: 'Name',
            validationRules: [
              {
                type: 'required',
                message: 'Name is required',
              },
              {
                type: 'pattern',
                pattern: '^[^0-9]+$',
                message: 'Do not use digits in the Name',
              },
            ],
          },
          {
            dataField: 'Date',
            editorType: 'dxDateBox',
            label: { text: 'Date of birth', },
            editorOptions: { invalidDateMessage: 'The date must have the following format: MM/dd/yyyy', },
            validationRules: [
              { type: 'required', message: 'Date of birth is required', },
              {
                type: 'range',
                max: new Date().setFullYear(new Date().getFullYear() - 21),
                message: 'You must be at least 21 years old',
              },
            ],
          },
        ],
      },
      {
        itemType: 'group',
        caption: 'Shipping address',
        items: [
          {
            dataField: 'ShippingCountry',
            editorType: 'dxSelectBox',
            editorOptions: { dataSource: countries, },
            label: { text: 'Country', },
            validationRules: [
              { type: 'required', message: 'Country is required', },
            ],
          },
          {
            dataField: 'ShippingCity',
            editorType: 'dxAutocomplete',
            label: { text: 'City', },
            editorOptions: { dataSource: cities, minSearchLength: 2, },
            validationRules: [
              {
                type: 'pattern',
                pattern: '^[^0-9]+$',
                message: 'Do not use digits in the City name',
              },
              {
                type: 'stringLength',
                min: 2,
                message: 'City must have at least 2 symbols',
              },
              { type: 'required', message: 'City is required', },
            ],
          },
          {
            dataField: 'ShippingAddress',
            label: { text: 'Address', },
            validationRules: [
              { type: 'required', message: 'Address is required', },
            ],
          },
          {
            dataField: 'Phone',
            helpText: 'Enter the phone number in USA phone format',
            editorOptions: {
              mask: '+1 (X00) 000-0000',
              maskRules: { X: /[02-9]/, },
              maskInvalidMessage: 'The phone must have a correct USA phone format',
            },
            validationRules: [
              {
                type: 'pattern',
                pattern: /^[02-9]\d{9}$/,
                message: 'The phone must have a correct USA phone format',
              },
            ],
          },
        ],
      },
      {
        itemType: 'group',
        caption: 'Billing address',
        items: [
          {
            dataField: 'BillingCountry',
            editorType: 'dxSelectBox',
            editorOptions: { dataSource: countries, },
            label: { text: 'Country', },
            validationRules: [
              { type: 'required', message: 'Country is required', },
            ],
          },
          {
            dataField: 'BillingCity',
            editorType: 'dxAutocomplete',
            editorOptions: { dataSource: cities, minSearchLength: 2, },
            label: { text: 'City', },
            validationRules: [
              {
                type: 'pattern',
                pattern: '^[^0-9]+$',
                message: 'Do not use digits in the City name',
              },
              {
                type: 'stringLength',
                min: 2,
                message: 'City must have at least 2 symbols',
              },
              { type: 'required', message: 'City is required', },
            ],
          },
          {
            dataField: 'BillingAddress',
            label: { text: 'Address', },
            validationRules: [
              { type: 'required', message: 'Address is required', },
            ],
          },
        ],
      },
      {
        dataField: 'Accepted',
        label: { visible: false, },
        editorOptions: { text: 'I agree to the Terms and Conditions', },
        validationRules: [
          {
            type: 'compare',
            comparisonTarget: () => true,
            message: 'You must agree to the Terms and Conditions',
          },
        ],
      },
      {
        itemType: 'button',
        horizontalAlignment: 'left',
        buttonOptions: {
          text: 'Register',
          type: 'success',
          useSubmitBehavior: true,
        },
      },
    ],
  }).dxForm('instance');
})();
