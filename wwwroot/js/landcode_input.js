'use strict';

/*Exports*/

//export these variables for external use.
export { mobile_selector, telephone_selector, mobile_code_value, telephone_code_value };
  
/*Functions*/

// function to make the mobile_code_value the value of the mobile selector.
function updateMobileLandCodeValue() {
    mobile_code_value.value = mobile_selector.value;
};

// function to make the telephone_code_value the value of the telephone selector.
function updateTelephoneLandCodeValue() {
    telephone_code_value.value = telephone_selector.value;
};

// loop through the data and get the name of the value of a node.
function getNameByValue(data, optionElement) { 
    for (var k in data) {
      if (data.hasOwnProperty(k) && data[k].value === optionElement.value) {
        optionElement.textContent = data[k].name;
        break; // Exit the loop since we found the matching value
      }
    }
}

// the name and value from the data object 
function Getcode(data, selectoption) {
    // get the data from the data array, select only the 'value' and 'name'.
    data.forEach(({ value, name }) => {
        const option = document.createElement('option'); // create a new element 'option'.
        option.value = value; // for every option.value, give it the a value from the data 'value'.
        option.textContent = name; // for every option.textcontent give it a value from the data 'name'.
        selectoption.appendChild(option); // append the created option in the mobile code selector.
    });
}

/*DATA*/


const data = [
    { name: 'Afghanistan', value: '+93', label: 'AF/AFG' },
    { name: 'Albania', value: '+355', label: 'AL/ALB' },
    { name: 'Algeria', value: '+213', label: 'DZ/DZA' },
    { name: 'American Samoa', value: '+1-684', label: 'AS/ASM' },
    { name: 'Andorra', value: '+376', label: 'AD/AND' },
    { name: 'Angola', value: '+244', label: 'AO/AGO' },
    { name: 'Anguilla', value: '+1-264', label: 'AI/AIA' },
    { name: 'Antarctica', value: '+672', label: 'AQ/ATA' },
    { name: 'Antigua and Barbuda', value: '+1-268', label: 'AG/ATG' },
    { name: 'Argentina', value: '+54', label: 'AR/ARG' },
    { name: 'Armenia', value: '+374', label: 'AM/ARM' },
    { name: 'Aruba', value: '+297', label: 'AW/ABW' },
    { name: 'Australia', value: '+61', label: 'AU/AUS' },
    { name: 'Austria', value: '+43', label: 'AT/AUT' },
    { name: 'Azerbaijan', value: '+994', label: 'AZ/AZE' },
    { name: 'Bahamas', value: '+1-242', label: 'BS/BHS' },
    { name: 'Bahrain', value: '+973', label: 'BH/BHR' },
    { name: 'Bangladesh', value: '+880', label: 'BD/BGD' },
    { name: 'Barbados', value: '+1-246', label: 'BB/BRB' },
    { name: 'Belarus', value: '+375', label: 'BY/BLR' },
    { name: 'Belgium', value: '+32', label: 'BE/BEL' },
    { name: 'Belize', value: '+501', label: 'BZ/BLZ' },
    { name: 'Benin', value: '+229', label: 'BJ/BEN' },
    { name: 'Bermuda', value: '+1-441', label: 'BM/BMU' },
    { name: 'Bhutan', value: '+975', label: 'BT/BTN' },
    { name: 'Bolivia', value: '+591', label: 'BO/BOL' },
    { name: 'Bosnia and Herzegovina', value: '+387', label: 'BA/BIH' },
    { name: 'Botswana', value: '+267', label: 'BW/BWA' },
    { name: 'Brazil', value: '+55', label: 'BR/BRA' },
    { name: 'British Indian Ocean Territory', value: '+246', label: 'IO/IOT' },
    { name: 'British Virgin Islands', value: '+1-284', label: 'VG/VGB' },
    { name: 'Brunei', value: '+673', label: 'BN/BRN' },
    { name: 'Bulgaria', value: '+359', label: 'BG/BGR' },
    { name: 'Burkina Faso', value: '+226', label: 'BF/BFA' },
    { name: 'Burundi', value: '+257', label: 'BI/BDI' },
    { name: 'Cambodia', value: '+855', label: 'KH/KHM' },
    { name: 'Cameroon', value: '+237', label: 'CM/CMR' },
    { name: 'Canada', value: '+1', label: 'CA/CAN' },
    { name: 'Cape Verde', value: '+238', label: 'CV/CPV' },
    { name: 'Cayman Islands', value: '+1-345', label: 'KY/CYM' },
    { name: 'Central African Republic', value: '+236', label: 'CF/CAF' },
    { name: 'Chad', value: '+235', label: 'TD/TCD' },
    { name: 'Chile', value: '+56', label: 'CL/CHL' },
    { name: 'China', value: '+86', label: 'CN/CHN' },
    { name: 'Christmas Island', value: '+61', label: 'CX/CXR' },
    { name: 'Cocos Islands', value: '+61', label: 'CC/CCK' },
    { name: 'Colombia', value: '+57', label: 'CO/COL' },
    { name: 'Comoros', value: '+269', label: 'KM/COM' },
    { name: 'Cook Islands', value: '+682', label: 'CK/COK' },
    { name: 'Costa Rica', value: '+506', label: 'CR/CRI' },
    { name: 'Croatia', value: '+385', label: 'HR/HRV' },
    { name: 'Cuba', value: '+53', label: 'CU/CUB' },
    { name: 'Curacao', value: '+599', label: 'CW/CUW' },
    { name: 'Cyprus', value: '+357', label: 'CY/CYP' },
    { name: 'Czech Republic', value: '+420', label: 'CZ/CZE' },
    { name: 'Democratic Republic of the Congo', value: '+243', label: 'CD/COD' },
    { name: 'Denmark', value: '+45', label: 'DK/DNK' },
    { name: 'Djibouti', value: '+253', label: 'DJ/DJI' },
    { name: 'Dominica', value: '+1-767', label: 'DM/DMA' },
    { name: 'Dominican Republic', value: '+1-809, 1-829, 1-849', label: 'DO/DOM' },
    { name: 'East Timor', value: '+670', label: 'TL/TLS' },
    { name: 'Ecuador', value: '+593', label: 'EC/ECU' },
    { name: 'Egypt', value: '+20', label: 'EG/EGY' },
    { name: 'El Salvador', value: '+503', label: 'SV/SLV' },
    { name: 'Equatorial Guinea', value: '+240', label: 'GQ/GNQ' },
    { name: 'Eritrea', value: '+291', label: 'ER/ERI' },
    { name: 'Estonia', value: '+372', label: 'EE/EST' },
    { name: 'Ethiopia', value: '+251', label: 'ET/ETH' },
    { name: 'Falkland Islands', value: '+500', label: 'FK/FLK' },
    { name: 'Faroe Islands', value: '+298', label: 'FO/FRO' },
    { name: 'Fiji', value: '+679', label: 'FJ/FJI' },
    { name: 'Finland', value: '+358', label: 'FI/FIN' },
    { name: 'France', value: '+33', label: 'FR/FRA' },
    { name: 'French Polynesia', value: '+689', label: 'PF/PYF' },
    { name: 'Gabon', value: '+241', label: 'GA/GAB' },
    { name: 'Gambia', value: '+220', label: 'GM/GMB' },
    { name: 'Georgia', value: '+995', label: 'GE/GEO' },
    { name: 'Germany', value: '+49', label: 'DE/DEU' },
    { name: 'Ghana', value: '+233', label: 'GH/GHA' },
    { name: 'Gibraltar', value: '+350', label: 'GI/GIB' },
    { name: 'Greece', value: '+30', label: 'GR/GRC' },
    { name: 'Greenland', value: '+299', label: 'GL/GRL' },
    { name: 'Grenada', value: '+1-473', label: 'GD/GRD' },
    { name: 'Guam', value: '+1-671', label: 'GU/GUM' },
    { name: 'Guatemala', value: '+502', label: 'GT/GTM' },
    { name: 'Guernsey', value: '+44-1481', label: 'GG/GGY' },
    { name: 'Guinea', value: '+224', label: 'GN/GIN' },
    { name: 'Guinea-Bissau', value: '+245', label: 'GW/GNB' },
    { name: 'Guyana', value: '+592', label: 'GY/GUY' },
    { name: 'Haiti', value: '+509', label: 'HT/HTI' },
    { name: 'Honduras', value: '+504', label: 'HN/HND' },
    { name: 'Hong Kong', value: '+852', label: 'HK/HKG' },
    { name: 'Hungary', value: '+36', label: 'HU/HUN' },
    { name: 'Iceland', value: '+354', label: 'IS/ISL' },
    { name: 'India', value: '+91', label: 'IN/IND' },
    { name: 'Indonesia', value: '+62', label: 'ID/IDN' },
    { name: 'Iran', value: '+98', label: 'IR/IRN' },
    { name: 'Iraq', value: '+964', label: 'IQ/IRQ' },
    { name: 'Ireland', value: '+353', label: 'IE/IRL' },
    { name: 'Isle of Man', value: '+44-1624', label: 'IM/IMN' },
    { name: 'Israel', value: '+972', label: 'IL/ISR' },
    { name: 'Italy', value: '+39', label: 'IT/ITA' },
    { name: 'Ivory Coast', value: '+225', label: 'CI/CIV' },
    { name: 'Jamaica', value: '+1-876', label: 'JM/JAM' },
    { name: 'Japan', value: '+81', label: 'JP/JPN' },
    { name: 'Jersey', value: '+44-1534', label: 'JE/JEY' },
    { name: 'Jordan', value: '+962', label: 'JO/JOR' },
    { name: 'Kazakhstan', value: '+7', label: 'KZ/KAZ' },
    { name: 'Kenya', value: '+254', label: 'KE/KEN' },
    { name: 'Kiribati', value: '+686', label: 'KI/KIR' },
    { name: 'Kosovo', value: '+383', label: 'XK/XKX' },
    { name: 'Kuwait', value: '+965', label: 'KW/KWT' },
    { name: 'Kyrgyzstan', value: '+996', label: 'KG/KGZ' },
    { name: 'Laos', value: '+856', label: 'LA/LAO' },
    { name: 'Latvia', value: '+371', label: 'LV/LVA' },
    { name: 'Lebanon', value: '+961', label: 'LB/LBN' },
    { name: 'Lesotho', value: '+266', label: 'LS/LSO' },
    { name: 'Liberia', value: '+231', label: 'LR/LBR' },
    { name: 'Libya', value: '+218', label: 'LY/LBY' },
    { name: 'Liechtenstein', value: '+423', label: 'LI/LIE' },
    { name: 'Lithuania', value: '+370', label: 'LT/LTU' },
    { name: 'Luxembourg', value: '+352', label: 'LU/LUX' },
    { name: 'Macau', value: '+853', label: 'MO/MAC' },
    { name: 'Macedonia', value: '+389', label: 'MK/MKD' },
    { name: 'Madagascar', value: '+261', label: 'MG/MDG' },
    { name: 'Malawi', value: '+265', label: 'MW/MWI' },
    { name: 'Malaysia', value: '+60', label: 'MY/MYS' },
    { name: 'Maldives', value: '+960', label: 'MV/MDV' },
    { name: 'Mali', value: '+223', label: 'ML/MLI' },
    { name: 'Malta', value: '+356', label: 'MT/MLT' },
    { name: 'Marshall Islands', value: '+692', label: 'MH/MHL' },
    { name: 'Mauritania', value: '+222', label: 'MR/MRT' },
    { name: 'Mauritius', value: '+230', label: 'MU/MUS' },
    { name: 'Mayotte', value: '+262', label: 'YT/MYT' },
    { name: 'Mexico', value: '+52', label: 'MX/MEX' },
    { name: 'Micronesia', value: '+691', label: 'FM/FSM' },
    { name: 'Moldova', value: '+373', label: 'MD/MDA' },
    { name: 'Monaco', value: '+377', label: 'MC/MCO' },
    { name: 'Mongolia', value: '+976', label: 'MN/MNG' },
    { name: 'Montenegro', value: '+382', label: 'ME/MNE' },
    { name: 'Montserrat', value: '+1-664', label: 'MS/MSR' },
    { name: 'Morocco', value: '+212', label: 'MA/MAR' },
    { name: 'Mozambique', value: '+258', label: 'MZ/MOZ' },
    { name: 'Myanmar', value: '+95', label: 'MM/MMR' },
    { name: 'Namibia', value: '+264', label: 'NA/NAM' },
    { name: 'Nauru', value: '+674', label: 'NR/NRU' },
    { name: 'Nepal', value: '+977', label: 'NP/NPL' },
    { name: 'Netherlands', value: '+31', label: 'NL/NLD' },
    { name: 'Netherlands Antilles', value: '+599', label: 'AN/ANT' },
    { name: 'New Caledonia', value: '+687', label: 'NC/NCL' },
    { name: 'New Zealand', value: '+64', label: 'NZ/NZL' },
    { name: 'Nicaragua', value: '+505', label: 'NI/NIC' },
    { name: 'Niger', value: '+227', label: 'NE/NER' },
    { name: 'Nigeria', value: '+234', label: 'NG/NGA' },
    { name: 'Niue', value: '+683', label: 'NU/NIU' },
    { name: 'North Korea', value: '+850', label: 'KP/PRK' },
    { name: 'Northern Mariana Islands', value: '+1-670', label: 'MP/MNP' },
    { name: 'Norway', value: '+47', label: 'NO/NOR' },
    { name: 'Oman', value: '+968', label: 'OM/OMN' },
    { name: 'Pakistan', value: '+92', label: 'PK/PAK' },
    { name: 'Palau', value: '+680', label: 'PW/PLW' },
    { name: 'Palestine', value: '+970', label: 'PS/PSE' },
    { name: 'Panama', value: '+507', label: 'PA/PAN' },
    { name: 'Papua New Guinea', value: '+675', label: 'PG/PNG' },
    { name: 'Paraguay', value: '+595', label: 'PY/PRY' },
    { name: 'Peru', value: '+51', label: 'PE/PER' },
    { name: 'Philippines', value: '+63', label: 'PH/PHL' },
    { name: 'Pitcairn', value: '+64', label: 'PN/PCN' },
    { name: 'Poland', value: '+48', label: 'PL/POL' },
    { name: 'Portugal', value: '+351', label: 'PT/PRT' },
    { name: 'Puerto Rico', value: '+1-787, 1-939', label: 'PR/PRI' },
    { name: 'Qatar', value: '+974', label: 'QA/QAT' },
    { name: 'Republic of the Congo', value: '+242', label: 'CG/COG' },
    { name: 'Reunion', value: '+262', label: 'RE/REU' },
    { name: 'Romania', value: '+40', label: 'RO/ROU' },
    { name: 'Russia', value: '+7', label: 'RU/RUS' },
    { name: 'Rwanda', value: '+250', label: 'RW/RWA' },
    { name: 'Saint Barthelemy', value: '+590', label: 'BL/BLM' },
    { name: 'Saint Helena', value: '+290', label: 'SH/SHN' },
    { name: 'Saint Kitts and Nevis', value: '+1-869', label: 'KN/KNA' },
    { name: 'Saint Lucia', value: '+1-758', label: 'LC/LCA' },
    { name: 'Saint Martin', value: '+590', label: 'MF/MAF' },
    { name: 'Saint Pierre and Miquelon', value: '+508', label: 'PM/SPM' },
    { name: 'Saint Vincent and the Grenadines', value: '+1-784', label: 'VC/VCT' },
    { name: 'Samoa', value: '+685', label: 'WS/WSM' },
    { name: 'San Marino', value: '+378', label: 'SM/SMR' },
    { name: 'Sao Tome and Principe', value: '+239', label: 'ST/STP' },
    { name: 'Saudi Arabia', value: '+966', label: 'SA/SAU' },
    { name: 'Senegal', value: '+221', label: 'SN/SEN' },
    { name: 'Serbia', value: '+381', label: 'RS/SRB' },
    { name: 'Seychelles', value: '+248', label: 'SC/SYC' },
    { name: 'Sierra Leone', value: '+232', label: 'SL/SLE' },
    { name: 'Singapore', value: '+65', label: 'SG/SGP' },
    { name: 'Sint Maarten', value: '+1-721', label: 'SX/SXM' },
    { name: 'Slovakia', value: '+421', label: 'SK/SVK' },
    { name: 'Slovenia', value: '+386', label: 'SI/SVN' },
    { name: 'Solomon Islands', value: '+677', label: 'SB/SLB' },
    { name: 'Somalia', value: '+252', label: 'SO/SOM' },
    { name: 'South Africa', value: '+27', label: 'ZA/ZAF' },
    { name: 'South Korea', value: '+82', label: 'KR/KOR' },
    { name: 'South Sudan', value: '+211', label: 'SS/SSD' },
    { name: 'Spain', value: '+34', label: 'ES/ESP' },
    { name: 'Sri Lanka', value: '+94', label: 'LK/LKA' },
    { name: 'Sudan', value: '+249', label: 'SD/SDN' },
    { name: 'Suriname', value: '+597', label: 'SR/SUR' },
    { name: 'Svalbard and Jan Mayen', value: '+47', label: 'SJ/SJM' },
    { name: 'Swaziland', value: '+268', label: 'SZ/SWZ' },
    { name: 'Sweden', value: '+46', label: 'SE/SWE' },
    { name: 'Switzerland', value: '+41', label: 'CH/CHE' },
    { name: 'Syria', value: '+963', label: 'SY/SYR' },
    { name: 'Taiwan', value: '+886', label: 'TW/TWN' },
    { name: 'Tajikistan', value: '+992', label: 'TJ/TJK' },
    { name: 'Tanzania', value: '+255', label: 'TZ/TZA' },
    { name: 'Thailand', value: '+66', label: 'TH/THA' },
    { name: 'Togo', value: '+228', label: 'TG/TGO' },
    { name: 'Tokelau', value: '+690', label: 'TK/TKL' },
    { name: 'Tonga', value: '+676', label: 'TO/TON' },
    { name: 'Trinidad and Tobago', value: '+1-868', label: 'TT/TTO' },
    { name: 'Tunisia', value: '+216', label: 'TN/TUN' },
    { name: 'Turkey', value: '+90', label: 'TR/TUR' },
    { name: 'Turkmenistan', value: '+993', label: 'TM/TKM' },
    { name: 'Turks and Caicos Islands', value: '+1-649', label: 'TC/TCA' },
    { name: 'Tuvalu', value: '+688', label: 'TV/TUV' },
    { name: 'U.S. Virgin Islands', value: '+1-340', label: 'VI/VIR' },
    { name: 'Uganda', value: '+256', label: 'UG/UGA' },
    { name: 'Ukraine', value: '+380', label: 'UA/UKR' },
    { name: 'United Arab Emirates', value: '+971', label: 'AE/ARE' },
    { name: 'United Kingdom', value: '+44', label: 'GB/GBR' },
    { name: 'United States', value: '+1', label: 'US/USA' },
    { name: 'Uruguay', value: '+598', label: 'UY/URY' },
    { name: 'Uzbekistan', value: '+998', label: 'UZ/UZB' },
    { name: 'Vanuatu', value: '+678', label: 'VU/VUT' },
    { name: 'Vatican', value: '+379', label: 'VA/VAT' },
    { name: 'Venezuela', value: '+58', label: 'VE/VEN' },
    { name: 'Vietnam', value: '+84', label: 'VN/VNM' },
    { name: 'Wallis and Futuna', value: '+681', label: 'WF/WLF' },
    { name: 'Western Sahara', value: '+212', label: 'EH/ESH' },
    { name: 'Yemen', value: '+967', label: 'YE/YEM' },
    { name: 'Zambia', value: '+260', label: 'ZM/ZMB' },
    { name: 'Zimbabwe', value: '+263', label: 'ZW/ZWE' }
    // add more entries as needed
];


/*Variables*/


// select the mobile variables.
let mobile_selector = document.querySelector('.MobileCaller');
const selectMobile = document.getElementById('MobileCaller');
let mobile_code_value = document.getElementById('MobileCodeValue');


// select the telephone variables.
let telephone_selector = document.querySelector('.TelephoneCaller');
const selectTelephone = document.getElementById('TelephoneCaller'); 
let telephone_code_value = document.getElementById('TelephoneCodeValue');

// select the option value when in edit page.
let OptionSelectedTelephoneId = document.getElementById('OptionSelectedTelephoneId');
let OptionSelectedMobileId = document.getElementById('OptionSelectedMobileId');


/*Functionality*/


if(OptionSelectedTelephoneId) {
    // update the calling code selecter name in edit.
    getNameByValue(data, OptionSelectedTelephoneId);
}

if(OptionSelectedMobileId) {
    // update the calling code selecter name in edit.
    getNameByValue(data, OptionSelectedMobileId);
}

if (selectMobile) {
    Getcode(data, selectMobile);
    //update mobile landcode value.
    mobile_selector.addEventListener('input', updateMobileLandCodeValue); // update the value in mobile readonly box.
    addEventListener('load', updateMobileLandCodeValue); // update the value in mobile readonly box.
    addEventListener('change', updateMobileLandCodeValue); // update the value in mobile readonly box.
}

if (selectTelephone) {
    Getcode(data, selectTelephone);
    //update telephone landcode value.
    telephone_selector.addEventListener('input', updateTelephoneLandCodeValue); // update the value in telephone readonly box.
    addEventListener('load', updateTelephoneLandCodeValue); // update the value in telephone readonly box.
    addEventListener('change', updateTelephoneLandCodeValue); // update the value in telephone readonly box.
}
