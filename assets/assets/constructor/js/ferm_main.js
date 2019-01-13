$(document).ready(function() {
  var set_config = false;
  var sceleton_width = 1280;
  var sceleton_height = 800;
  var valves_horizontal = ["S-06", "S-02", "S-21", "S-22"];
  var valves_vertical = ["S-03", "S-05", "S-07", "S-12", "S-04", "S-08"];
  var valves_heater = ["TR-01"];
  var pump = ["P-01", "P-120", "P-110"];
  var valves_analog = ["FQIC-01"];
  var valves_motor = ["M-01"];
  var valve_names = {
    "S-02": "S-02",
    "S-06": "S-06",
    "S-21": "S-21",
    "S-23Bict": "S-21",
    "S-03": "S-03",
    "S-04": "S-04",
    "S-05": "S-05",
    "S-07": "S-07",
    "S-12": "S-12",
    "S-08": "S-08",
    "S-22Bict": "S-22",
    "S-20Bict": "S-20",
    "S-22": "S-22"
  };
  var name = window.location.href.slice(-1);
  var global_status = [];
  var inactive_opacity = 0.1;
  var active_opacity = 1;

  var config_string = `{
  "contacts": {
    "name": "",
    "phone": "",
    "email": "",
    "message": ""
  },
  "config": {
    "enviroment_temperature":{},
    "heat_sources":{
      "gas_boiler":{
        "exist":0
      },
      "electric_boiler":{
        "exist":0,"power":0
      },
      "heat_pump":{
        "exist":0,
        "heat_mode":0,
        "cool_mode":0,
        "consumed_power":10,
        "minimum_effective_enviroment_temperature":-10
      },
      "fireplace":{
        "exist":0,
        "temp_sensors":2
      }
    },
    "heat_consumers":{
      "tank_water_tank":{
        "exist":0,
        "pump_power":0
      },
      "fancoil":{
        "exist":0,
        "pump_power":0,
        "3way":{
          "exist":0
        }
      },
      "warm_floor":{
        "exist":0,
        "pump_power":0,
        "3way":{
          "exist":0
        }
      },
      "radiator":{
        "exist":0,
        "pump_power":0,
        "3way":{
          "exist":0
        }
      }
    },
    "main_tank_sensors":{
      "top":0,
      "middle":1,
      "bottom":0
    },
    "gvs_tank_sources":{
      "ten":{
        "exist":0,
        "power":0
      },
      "sun_collector":{
        "exist":0,
        "pump_power":0
      }
    },
    "gvs":{
      "exist":0,
      "pump_power":0,
      "3way":{
        "exist":0
      }
    },
    "gvs_boiler":{
      "exist":0
    }
  }
}`;

  var errorObj = {
    ukr: {
      nameError: {
        required: "Введіть будь ласка Прізвище та ім'я",
        length: "Прізвище та ім'я повинні бути більше 3 символів"
      },
      phoneError: {
        required: "Вкажіть будь ласка номер мобільного телефону",
        number: "Номер повинен складатися тільки із цифр",
        length: "Номер повинен містити більше 10 цифр"
      },
      emailError: {
        required: "Введіть будь ласка Email адресу",
        symbol: 'Email адреса повинна містити "@"'
      }
    },
    eng: {
      nameError: {
        required: "Please enter your first and last name",
        length: "First and last name must be greater than 3 characters"
      },
      phoneError: {
        required: "Please indicate the number of your mobile phone",
        number: "The number must consist of numbers only",
        length: "The number must contain more than 10 digits"
      },
      emailError: {
        required: "Please enter your email",
        symbol: 'Email must contain "@"'
      }
    }
  };

  //var config_string = '{"config":{"enviroment_temperature":{},"heat_sources":{"gas_boiler":{"exist":1},"electric_boiler":{"exist":1,"power":0},"heat_pump":{"exist":1,"heat_mode":1,"cool_mode":1,"consumed_power":0,"minimum_effective_enviroment_temperature":-10},"fireplace":{"exist":1,"temp_sensors":2}},"heat_consumers":{"tank_water_tank":{"exist":1,"pump_power":0},"fancoil":{"exist":1,"pump_power":0,"3way":{"exist":1}},"warm_floor":{"exist":1,"pump_power":0,"3way":{"exist":1}},"radiator":{"exist":1,"pump_power":0,"3way":{"exist":1}}},"main_tank_sensors":{"top":0,"middle":1,"bottom":0},"gvs_tank_sources":{"ten":{"exist":1,"power":0},"sun_collector":{"exist":1,"pump_power":0}},"gvs":{"exist":1,"pump_power":0,"3way":{"exist":1}},"gvs_boiler":{"exist":1}}}'

  var configObj = JSON.parse(config_string);
  var errorLang = $("html").prop("lang") === "en" ? errorObj.eng : errorObj.ukr;
  contactData = configObj["contacts"];
  config = configObj["config"];

  console.log(errorLang, $("html").prop("lang"));

  const form = document.querySelector("#save-data__form");
  //$("#option_container").hide();
  /* console.log(config['heat_sources']['gas_boiler']); */

  set_ferm_container_dimentions();

  $("#return__link-id").click(function(e) {
    e.preventDefault();
    if (window.history) {
      window.history.back();
    }
  });

  $(".constructor_label").click(function() {
    $(".option_window").hide();
    $("html, body").css("overflow", "hidden");
    $("#option_container").css("display", "flex");

    if (this.id == "send-data-btn") {
      $("#option_window_send-data").css("display", "flex");
    }

    if (this.id == "tank_label") {
      $("#option_window_tank").css("display", "flex");
    }
    if (this.id == "electric_heater_label") {
      $("#option_window_electric_heater").css("display", "flex");
    }
    if (this.id == "gas_heater_label") {
      $("#option_window_gas_heater").css("display", "flex");
    }
    if (this.id == "heat_pump_label") {
      $("#option_window_heat_pump").css("display", "flex");
    }
    if (this.id == "fireplace_label") {
      $("#option_window_fireplace").css("display", "flex");
    }
    if (this.id == "fancoil_label") {
      $("#option_window_fancoil").css("display", "flex");
    }
    if (this.id == "radiator_label") {
      $("#option_window_radiator").css("display", "flex");
    }
    if (this.id == "warm_floor_label") {
      $("#option_window_warm_floor").css("display", "flex");
    }
    if (this.id == "tank_gvs_heat_label") {
      $("#option_window_tank_gvs_heat").css("display", "flex");
    }
    if (this.id == "tank_gvs_label") {
      $("#option_window_tank_gvs").css("display", "flex");
    }
    if (this.id == "sun_collector_label") {
      $("#option_window_sun_collector").css("display", "flex");
    }
    if (this.id == "ten_label") {
      $("#option_window_ten").css("display", "flex");
    }
    if (this.id == "hot_water_label") {
      $("#option_window_gvs").css("display", "flex");
    }
  });

  function adjustAppearence() {
    $("#tank").css("opacity", 1);
    console.log(config["main_tank_sensors"]);
    if (config["main_tank_sensors"]["top"] == 1) {
      $("#tank_top_sensor").css("opacity", active_opacity);
      $("#tank_top_sensor_setting").prop("checked", true);
    } else {
      $("#tank_top_sensor").css("opacity", inactive_opacity);
      $("#tank_top_sensor_setting").prop("checked", false);
    }

    if (config["main_tank_sensors"]["bottom"] == 1) {
      $("#tank_bottom_sensor").css("opacity", active_opacity);
      $("#tank_bottom_sensor_setting").prop("checked", true);
    } else {
      $("#tank_bottom_sensor").css("opacity", inactive_opacity);
      $("#tank_bottom_sensor_setting").prop("checked", false);
    }

    if (config["heat_sources"]["electric_boiler"]["exist"] == 1) {
      $("#electric_heater").css("opacity", active_opacity);
      // $('#electric_heater_power').prop('disabled',false)
    } else {
      $("#electric_heater").css("opacity", inactive_opacity);
      // $('#electric_heater_power').prop('disabled',true)
    }
    if (config["heat_sources"]["gas_boiler"]["exist"] == 1) {
      $("#gas_heater").css("opacity", active_opacity);
    } else {
      $("#gas_heater").css("opacity", inactive_opacity);
    }
    if (config["heat_sources"]["heat_pump"]["exist"] == 1) {
      $("#heat_pump").css("opacity", active_opacity);
    } else {
      $("#heat_pump").css("opacity", inactive_opacity);
    }
    if (config["heat_sources"]["fireplace"]["exist"] == 1) {
      $("#fireplace").css("opacity", active_opacity);
    } else {
      $("#fireplace").css("opacity", inactive_opacity);
    }

    if (config["heat_consumers"]["fancoil"]["exist"] == 1) {
      $("#fancoil_main").css("opacity", active_opacity);
    } else {
      $("#fancoil_main").css("opacity", inactive_opacity);
    }
    if (config["heat_consumers"]["fancoil"]["3way"]["exist"] == 1) {
      $("#fancoil_3way").css("opacity", active_opacity);
    } else {
      $("#fancoil_3way").css("opacity", inactive_opacity);
    }

    if (config["heat_consumers"]["radiator"]["exist"] == 1) {
      $("#radiator_main").css("opacity", active_opacity);
    } else {
      $("#radiator_main").css("opacity", inactive_opacity);
    }
    if (config["heat_consumers"]["radiator"]["3way"]["exist"] == 1) {
      $("#radiator_3way").css("opacity", active_opacity);
    } else {
      $("#radiator_3way").css("opacity", inactive_opacity);
    }

    if (config["heat_consumers"]["warm_floor"]["exist"] == 1) {
      $("#warm_floor_main").css("opacity", active_opacity);
    } else {
      $("#warm_floor_main").css("opacity", inactive_opacity);
    }
    if (config["heat_consumers"]["warm_floor"]["3way"]["exist"] == 1) {
      $("#warm_floor_3way").css("opacity", active_opacity);
    } else {
      $("#warm_floor_3way").css("opacity", inactive_opacity);
    }
    if (config["heat_consumers"]["tank_water_tank"]["exist"] == 1) {
      $("#tank_gvs_heat").css("opacity", active_opacity);
    } else {
      $("#tank_gvs_heat").css("opacity", inactive_opacity);
    }
    if (config["heat_consumers"]["tank_water_tank"]["exist"] == 1) {
      $("#tank_gvs_heat").css("opacity", active_opacity);
    } else {
      $("#tank_gvs_heat").css("opacity", inactive_opacity);
    }
    if (config["gvs_boiler"]["exist"] == 1) {
      $("#tank_gvs").css("opacity", active_opacity);
    } else {
      $("#tank_gvs").css("opacity", inactive_opacity);
    }
    if (config["gvs_tank_sources"]["sun_collector"]["exist"] == 1) {
      $("#sun_collector").css("opacity", active_opacity);
    } else {
      $("#sun_collector").css("opacity", inactive_opacity);
    }
    if (config["gvs_tank_sources"]["ten"]["exist"] == 1) {
      $("#ten").css("opacity", active_opacity);
    } else {
      $("#ten").css("opacity", inactive_opacity);
    }

    if (config["gvs"]["exist"] == 1) {
      $("#hot_water_main").css("opacity", active_opacity);
    } else {
      $("#hot_water_main").css("opacity", inactive_opacity);
    }
    if (config["gvs"]["3way"]["exist"] == 1) {
      $("#hot_water_3way").css("opacity", active_opacity);
    } else {
      $("#hot_water_3way").css("opacity", inactive_opacity);
    }

    /* $("#config_line").text(JSON.stringify(config)) */
  }

  function adjustSettingsAppearence() {
    if (config["main_tank_sensors"]["top"] == 1) {
      $("#tank_top_sensor_setting").prop("checked", true);
    } else {
      $("#tank_top_sensor_setting").prop("checked", false);
    }

    if (config["main_tank_sensors"]["bottom"] == 1) {
      $("#tank_bottom_sensor_setting").prop("checked", true);
    } else {
      $("#tank_bottom_sensor_setting").prop("checked", false);
    }

    if (config["heat_sources"]["electric_boiler"]["exist"] == 1) {
      $("#electric_heater_exist").prop("checked", true);
    } else {
      $("#electric_heater_exist").prop("checked", false);
    }
    $("#electric_heater_power").val(
      config["heat_sources"]["electric_boiler"]["power"]
    );

    if (config["heat_sources"]["gas_boiler"]["exist"] == 1) {
      $("#gas_heater_exist").prop("checked", true);
    } else {
      $("#gas_heater_exist").prop("checked", false);
    }
    if (config["heat_sources"]["heat_pump"]["exist"] == 1) {
      $("#heat_pump_exist").prop("checked", true);
    } else {
      $("#heat_pump_exist").prop("checked", false);
    }
    $("#heat_pump_power").val(
      config["heat_sources"]["heat_pump"]["consumed_power"]
    );
    if (config["heat_sources"]["heat_pump"]["heat_mode"] == 1) {
      $("#heat_pump_heat_mode").prop("checked", true);
    } else {
      $("#heat_pump_heat_mode").prop("checked", false);
    }
    if (config["heat_sources"]["heat_pump"]["cool_mode"] == 1) {
      $("#heat_pump_cool_mode").prop("checked", true);
    } else {
      $("#heat_pump_cool_mode").prop("checked", false);
    }
    $("#heat_pump_power").val(
      config["heat_sources"]["heat_pump"]["consumed_power"]
    );

    if (config["heat_sources"]["fireplace"]["exist"] == 1) {
      $("#fireplace_exist").prop("checked", true);
    } else {
      $("#fireplace_exist").prop("checked", false);
    }

    if (config["heat_consumers"]["fancoil"]["3way"]["exist"] == 1) {
      $("#fancoil_3way_exist").prop("checked", true);
    } else {
      $("#fancoil_3way_exist").prop("checked", false);
    }
    if (config["heat_consumers"]["fancoil"]["exist"] == 1) {
      $("#fancoil_exist").prop("checked", true);
    } else {
      $("#fancoil_exist").prop("checked", false);
      $("#fancoil_3way_exist").prop("checked", false);
    }
    $("#fancoil_pump_power").val(
      config["heat_consumers"]["fancoil"]["pump_power"]
    );

    if (config["heat_consumers"]["radiator"]["3way"]["exist"] == 1) {
      $("#radiator_3way_exist").prop("checked", true);
    } else {
      $("#radiator_3way_exist").prop("checked", false);
    }
    if (config["heat_consumers"]["radiator"]["exist"] == 1) {
      $("#radiator_exist").prop("checked", true);
    } else {
      $("#radiator_exist").prop("checked", false);
      $("#radiator_3way_exist").prop("checked", false);
    }
    $("#radiator_pump_power").val(
      config["heat_consumers"]["radiator"]["pump_power"]
    );

    if (config["heat_consumers"]["warm_floor"]["3way"]["exist"] == 1) {
      $("#warm_floor_3way_exist").prop("checked", true);
    } else {
      $("#warm_floor_3way_exist").prop("checked", false);
    }
    if (config["heat_consumers"]["warm_floor"]["exist"] == 1) {
      $("#warm_floor_exist").prop("checked", true);
    } else {
      $("#warm_floor_exist").prop("checked", false);
      $("#warm_floor_3way_exist").prop("checked", false);
    }
    $("#warm_floor_pump_power").val(
      config["heat_consumers"]["warm_floor"]["pump_power"]
    );

    if (config["heat_consumers"]["tank_water_tank"]["exist"] == 1) {
      $("#tank_gvs_heat_exist").prop("checked", true);
    } else {
      $("#tank_gvs_heat_exist").prop("checked", false);
    }
    $("#tank_gvs_heat_pump_power").val(
      config["heat_consumers"]["tank_water_tank"]["pump_power"]
    );
    if (config["gvs_boiler"]["exist"] == 1) {
      $("#tank_gvs_exist").prop("checked", true);
    } else {
      $("#tank_gvs_exist").prop("checked", false);
    }
    if (config["gvs_tank_sources"]["sun_collector"]["exist"] == 1) {
      $("#sun_collector_exist").prop("checked", true);
    } else {
      $("#sun_collector_exist").prop("checked", false);
    }
    if (config["gvs_tank_sources"]["ten"]["exist"] == 1) {
      $("#ten_exist").prop("checked", true);
    } else {
      $("#ten_exist").prop("checked", false);
    }
    $("#ten_power").val(config["gvs_tank_sources"]["ten"]["power"]);

    if (config["gvs"]["3way"]["exist"] == 1) {
      $("#gvs_3way_exist").prop("checked", true);
    } else {
      $("#gvs_3way_exist").prop("checked", false);
    }
    if (config["gvs"]["exist"] == 1) {
      $("#gvs_exist").prop("checked", true);
    } else {
      $("#gvs_exist").prop("checked", false);
      $("#gvs_3way_exist").prop("checked", false);
    }
    $("#gvs_pump_power").val(config["gvs"]["pump_power"]);
    $("#sun_collector_pump_power").val(
      config["gvs_tank_sources"]["sun_collector"]["pump_power"]
    );
  }

  $(".save_button").click(function() {
    $("#option_container").hide();
    $("html, body").css("overflow", "unset");
    if ($("#tank_top_sensor_setting").prop("checked")) {
      config["main_tank_sensors"]["top"] = 1;
    } else {
      config["main_tank_sensors"]["top"] = 0;
    }

    if ($("#tank_bottom_sensor_setting").prop("checked")) {
      config["main_tank_sensors"]["bottom"] = 1;
    } else {
      config["main_tank_sensors"]["bottom"] = 0;
    }

    if ($("#electric_heater_exist").prop("checked")) {
      config["heat_sources"]["electric_boiler"]["exist"] = 1;
      //$('#electric_heater_power').prop('disabled',false);
      config["heat_sources"]["electric_boiler"]["power"] = $(
        "#electric_heater_power"
      ).val();
    } else {
      config["heat_sources"]["electric_boiler"]["exist"] = 0;
      //$('#electric_heater_power').prop('disabled',true)
    }
    if ($("#gas_heater_exist").prop("checked")) {
      config["heat_sources"]["gas_boiler"]["exist"] = 1;
    } else {
      config["heat_sources"]["gas_boiler"]["exist"] = 0;
    }
    if ($("#heat_pump_exist").prop("checked")) {
      config["heat_sources"]["heat_pump"]["exist"] = 1;
      config["heat_sources"]["heat_pump"]["consumed_power"] = $(
        "#heat_pump_power"
      ).val();
    } else {
      config["heat_sources"]["heat_pump"]["exist"] = 0;
      //$('#electric_heater_power').prop('disabled',true)
    }
    if ($("#heat_pump_heat_mode").prop("checked")) {
      config["heat_sources"]["heat_pump"]["heat_mode"] = 1;
    } else {
      config["heat_sources"]["heat_pump"]["heat_mode"] = 0;
    }
    if ($("#heat_pump_cool_mode").prop("checked")) {
      config["heat_sources"]["heat_pump"]["cool_mode"] = 1;
    } else {
      config["heat_sources"]["heat_pump"]["cool_mode"] = 0;
    }
    if ($("#fireplace_exist").prop("checked")) {
      config["heat_sources"]["fireplace"]["exist"] = 1;
    } else {
      config["heat_sources"]["fireplace"]["exist"] = 0;
    }

    if ($("#fancoil_3way_exist").prop("checked")) {
      config["heat_consumers"]["fancoil"]["3way"]["exist"] = 1;
    } else {
      config["heat_consumers"]["fancoil"]["3way"]["exist"] = 0;
    }
    if ($("#fancoil_exist").prop("checked")) {
      config["heat_consumers"]["fancoil"]["exist"] = 1;
    } else {
      config["heat_consumers"]["fancoil"]["exist"] = 0;
      config["heat_consumers"]["fancoil"]["3way"]["exist"] = 0;
      $("#fancoil_3way_exist").prop("checked", false);
    }
    config["heat_consumers"]["fancoil"]["pump_power"] = $(
      "#fancoil_pump_power"
    ).val();

    if ($("#radiator_3way_exist").prop("checked")) {
      config["heat_consumers"]["radiator"]["3way"]["exist"] = 1;
    } else {
      config["heat_consumers"]["radiator"]["3way"]["exist"] = 0;
    }
    if ($("#radiator_exist").prop("checked")) {
      config["heat_consumers"]["radiator"]["exist"] = 1;
    } else {
      config["heat_consumers"]["radiator"]["exist"] = 0;
      config["heat_consumers"]["radiator"]["3way"]["exist"] = 0;
      $("#radiator_3way_exist").prop("checked", false);
    }
    config["heat_consumers"]["radiator"]["pump_power"] = $(
      "#radiator_pump_power"
    ).val();

    if ($("#warm_floor_3way_exist").prop("checked")) {
      config["heat_consumers"]["warm_floor"]["3way"]["exist"] = 1;
    } else {
      config["heat_consumers"]["warm_floor"]["3way"]["exist"] = 0;
    }
    if ($("#warm_floor_exist").prop("checked")) {
      config["heat_consumers"]["warm_floor"]["exist"] = 1;
    } else {
      config["heat_consumers"]["warm_floor"]["exist"] = 0;
      config["heat_consumers"]["warm_floor"]["3way"]["exist"] = 0;
      $("#warm_floor_3way_exist").prop("checked", false);
    }
    config["heat_consumers"]["warm_floor"]["pump_power"] = $(
      "#warm_floor_pump_power"
    ).val();

    if ($("#tank_gvs_heat_exist").prop("checked")) {
      config["heat_consumers"]["tank_water_tank"]["exist"] = 1;
    } else {
      config["heat_consumers"]["tank_water_tank"]["exist"] = 0;
    }
    config["heat_consumers"]["tank_water_tank"]["pump_power"] = $(
      "#tank_gvs_heat_pump_power"
    ).val();
    if ($("#tank_gvs_exist").prop("checked")) {
      config["gvs_boiler"]["exist"] = 1;
    } else {
      config["gvs_boiler"]["exist"] = 0;
    }
    if ($("#sun_collector_exist").prop("checked")) {
      config["gvs_tank_sources"]["sun_collector"]["exist"] = 1;
    } else {
      config["gvs_tank_sources"]["sun_collector"]["exist"] = 0;
    }
    config["gvs_tank_sources"]["sun_collector"]["pump_power"] = $(
      "#sun_collector_pump_power"
    ).val();

    if ($("#ten_exist").prop("checked")) {
      config["gvs_tank_sources"]["ten"]["exist"] = 1;
    } else {
      config["gvs_tank_sources"]["ten"]["exist"] = 0;
    }
    config["gvs_tank_sources"]["ten"]["power"] = $("#ten_power").val();

    if ($("#gvs_3way_exist").prop("checked")) {
      config["gvs"]["3way"]["exist"] = 1;
    } else {
      config["gvs"]["3way"]["exist"] = 0;
    }
    if ($("#gvs_exist").prop("checked")) {
      config["gvs"]["exist"] = 1;
    } else {
      config["gvs"]["exist"] = 0;
      config["gvs"]["3way"]["exist"] = 0;
      $("#gvs_3way_exist").prop("checked", false);
    }
    config["gvs"]["pump_power"] = $("#gvs_pump_power").val();

    adjustAppearence();
    /* console.log(config); */
  });

  // validate form user data
  function validateForm() {
    //required elements
    const name = document.forms["formSendData"]["formName"],
      phone = document.forms["formSendData"]["formPhone"],
      email = document.forms["formSendData"]["formEmail"];

    const check = [false, false, false];

    $(".send-data_button").prop("disabled", true);

    $(form).on("change", function() {
      $(name).on("blur input", function() {
        if (this.value == "") {
          $(".name_error").text(errorLang.nameError.required);
          check[0] = false;
        } else if (this.value.length < 3) {
          $(".name_error").text(errorLang.nameError.length);
          check[0] = false;
        } else {
          $(".name_error").text("");
          check[0] = true;
        }
      });

      $(phone).on("blur input", function() {
        const regExNumber = new RegExp("^[0-9]*$"),
          regEx = new RegExp("[0-9]{10,}");
        if (this.value == "") {
          $(".phone_error").text(errorLang.phoneError.required);
          check[1] = false;
        } else if (!regExNumber.test(this.value)) {
          $(".phone_error").text(errorLang.phoneError.number);
          check[1] = false;
        } else if (!regEx.test(this.value)) {
          $(".phone_error").text(errorLang.phoneError.length);
          check[1] = false;
        } else {
          $(".phone_error").text("");
          check[1] = true;
        }
      });

      $(email).on("blur input", function() {
        if (this.value == "") {
          $(".email_error").text(errorLang.emailError.required);
          check[2] = false;
        } else if (this.value.search("@") == -1) {
          $(".email_error").text(errorLang.emailError.symbol);
          console.log(errorLang.emailError.symbol);
          check[2] = false;
        } else {
          $(".email_error").text("");
          check[2] = true;
        }
      });
      $(form).on("focus input", function() {
        if (!checkingFlag(check)) {
          $(".send-data_button").prop("disabled", true);
        } else {
          $(".send-data_button").prop("disabled", false);
        }
      });
    });

    $(form).on("submit", function(e) {
      e.preventDefault();
      contactData["name"] = $(name).val();
      contactData["phone"] = $(phone).val();
      contactData["email"] = $(email).val();
      contactData["message"] = $("#send-data_comments").val();
      //verem87@gmail.com

      Email.send(
        "odoxar@gmail.com",
        "odoxar@gmail.com",
        `from ${contactData["email"]}`,
        pageTemplate(),
        "smtp.elasticemail.com",
        "odoxar@gmail.com",
        "0badaac5-da4b-4089-b44c-4e8f5a03741d"
      );
      this.reset();
      $("#option_window_send-data").hide();
      $("html, body").css("overflow", "unset");
    });
  }

  function checkingFlag(el) {
    return el.every(item => item === true);
  }

  validateForm();

  $(".options_checkbox").click(function() {
    /* if ($('#electric_heater_exist').prop('checked')){
        $('#electric_heater_power').prop('disabled',false)
    } else {
        $('#electric_heater_power').prop('disabled',true)
    }
*/
  });

  $(".close_button").click(function() {
    $("#option_container").hide();
    $("html, body").css("overflow", "unset");
    adjustAppearence();
  });

  function set_ferm_container_dimentions() {
    var width = $("#container").width();
    console.log(width);
    //var height = $(window).height()-80;

    var koeff = width / 1000;
    console.log(koeff);

    //$('.constructor_label').css('font-size', 14 * koeff);
    $(".constructor_label").width(100 * koeff);

    $("#tank_label").css("left", 294 * koeff);
    $("#tank_label").css("top", 53 * koeff);
    $("#tank_label").width(100 * koeff);
    //$('#tank_label').height(32 * koeff);

    $("#gas_heater_label").css("left", 79 * koeff);
    $("#gas_heater_label").css("top", 53 * koeff);
    $("#gas_heater_label").width(80 * koeff);
    //$('#gas_heater_label').height(32 * koeff);

    $("#electric_heater_label").css("left", 150 * koeff);
    $("#electric_heater_label").css("top", 22 * koeff);
    $("#electric_heater_label").width(100 * koeff);
    //$('#electric_heater_label').height(32 * koeff);

    $("#heat_pump_label").css("left", 50 * koeff);
    $("#heat_pump_label").css("top", 208 * koeff);
    $("#heat_pump_label").width(76 * koeff);
    //$('#heat_pump_label').height(32 * koeff);

    $("#fireplace_label").css("left", 139 * koeff);
    $("#fireplace_label").css("top", 327 * koeff);
    $("#fireplace_label").width(73 * koeff);
    //$('#fireplace_label').height(16 * koeff);

    $("#fancoil_label").css("left", 434 * koeff);
    $("#fancoil_label").css("top", 24 * koeff);
    $("#fancoil_label").width(73 * koeff);
    //$('#fancoil_label').height(32 * koeff);

    $("#radiator_label").css("left", 517 * koeff);
    $("#radiator_label").css("top", 24 * koeff);
    $("#radiator_label").width(73 * koeff);
    //$('#radiator_label').height(32 * koeff);

    $("#warm_floor_label").css("left", 597 * koeff);
    $("#warm_floor_label").css("top", 9 * koeff);
    $("#warm_floor_label").width(73 * koeff);
    //$('#warm_floor_label').height(48 * koeff);

    $("#tank_gvs_heat_label").css("left", 685 * koeff);
    $("#tank_gvs_heat_label").css("top", 8 * koeff);
    $("#tank_gvs_heat_label").width(90 * koeff);
    //$('#tank_gvs_heat_label').height(48 * koeff);

    $("#tank_gvs_label").css("left", 780 * koeff);
    $("#tank_gvs_label").css("top", 185 * koeff);
    $("#tank_gvs_label").width(80 * koeff);
    //$('#tank_gvs_label').height(32 * koeff);

    $("#sun_collector_label").css("left", 840 * koeff);
    $("#sun_collector_label").css("top", 85 * koeff);
    $("#sun_collector_label").width(100 * koeff);
    //$('#sun_collector_label').height(32 * koeff);

    $("#ten_label").css("left", 875 * koeff);
    $("#ten_label").css("top", 315 * koeff);
    $("#ten_label").width(55 * koeff);
    //$('#ten_label').height(16 * koeff);

    $("#hot_water_label").css("left", 455 * koeff);
    $("#hot_water_label").css("top", 295 * koeff);
    $("#hot_water_label").width(130 * koeff);
    //$('#hot_water_label').height(32 * koeff);

    //$('#send-data').css('top', 450 * koeff);
  }

  function pageTemplate() {
    return `
  <ul class="contacts">
    <li class="name"><span style="font-weight: bold">Ім'я клієнта</span> ${
      contactData["name"]
    }</li>
    <li class="phone"><span style="font-weight: bold">Телефон клієнта</span> ${
      contactData["phone"]
    }</li>
    <li class="email"><span style="font-weight: bold">Пошта клієнта</span> ${
      contactData["email"]
    }</li>
    <li class="message"><span style="font-weight: bold">Повідомлення клієнта:</span> <br> ${
      contactData["message"]
    }</li>
  </ul>
  <div class="config">
    <ul class="heat_sources">
      <li class="gas_boiler"><span style="font-weight: bold">Газовий котел -</span> ${
        config.heat_sources.gas_boiler.exist
      }</li>
      <li class="electric_boiler"><span style="font-weight: bold">Електричний котел -</span> ${
        config.heat_sources.electric_boiler.exist
      }, <span style="font-weight: bold">потужність</span> ${config.heat_sources.electric_boiler.power} , кВт</li>
      <li class="heat_pump"><span style="font-weight: bold">Тепловий насос -</span> ${
        config.heat_sources.heat_pump.exist
      }, <span style="font-weight: bold">потужність</span> ${config.heat_sources.heat_pump.consumed_power}, кВт
        <ul> <span style="font-weight: bold">Режими роботи:</span>
          <li><span style="font-weight: bold">нагрів</span> ${
            config.heat_sources.heat_pump.heat_mode
          }</li>
          <li><span style="font-weight: bold">охолодження</span> ${
            config.heat_sources.heat_pump.cool_mode
          }</li>
        </ul>
        <span style="font-weight: bold">мінімальна ефективна температура навколишнього середовища</span> ${
          config.heat_sources.heat_pump.minimum_effective_enviroment_temperature
        }
      </li>
      <li class="fireplace"><span style="font-weight: bold">Камін -</span> ${
        config.heat_sources.fireplace.exist
      }, <span style="font-weight: bold">датчики -</span> ${config.heat_sources.fireplace.temp_sensors}</li>
    </ul>
    <ul class="heat_consumers">
      <li class="tank_water_tank"><span style="font-weight: bold">Резервуар для води</span> ${
        config.heat_consumers.tank_water_tank.exist
      }, <span style="font-weight: bold">потужність -</span> ${config.heat_consumers.tank_water_tank.pump_power}, кВт</li>
      <li class="fancoil"><span style="font-weight: bold">Контур фанкойлів -</span> ${
        config.heat_consumers.fancoil.exist
      }, <span style="font-weight: bold">потужність -</span> ${config.heat_consumers.fancoil.pump_power}, кВт. <span style="font-weight: bold">Регулювання температури подачі ${config.heat_consumers.fancoil["3way"].exist}</li >
    <li class="warm_floor"><span style="font-weight: bold">Контур теплої підлоги -</span> ${
      config.heat_consumers.warm_floor.exist
    }, <span style="font-weight: bold">потужність -</span> ${config.heat_consumers.warm_floor.pump_power}, кВт.
      <span style="font-weight: bold">Регулювання температури подачі</span> ${
        config.heat_consumers.warm_floor["3way"].exist
      }</li>
    <li class="radiator"><span style="font-weight: bold">Контур опалення -</span> ${
      config.heat_consumers.radiator.exist
    }, <span style="font-weight: bold">потужність -</span> ${config.heat_consumers.radiator.pump_power},
      кВт. <span style="font-weight: bold">Регулювання температури подачі</span> ${
        config.heat_consumers.radiator["3way"].exist
      }</li>
    </ul >
    <ul class="main_tank_sensors">
      <li class="top"><span style="font-weight: bold">Датчик у верхній частині баку -</span> ${
        config.main_tank_sensors.top
      }</li>
      <li class="middle"><span style="font-weight: bold">Датчик у середній частині баку -</span> ${
        config.main_tank_sensors.middle
      } (за замовчуванням)</li>
      <li class="bottom"><span style="font-weight: bold">Датчик у ніжній частині баку -</span> ${
        config.main_tank_sensors.bottom
      }</li>
    </ul>
    <ul class="gvs_tank_sources">
      <li class="ten"><span style="font-weight: bold">Електричний нагрівач -</span> ${
        config.gvs_tank_sources.ten.exist
      }, <span style="font-weight: bold">потужність</span> ${config.gvs_tank_sources.ten.power}
        , кВт</li>
      <li class="sun_collector"><span style="font-weight: bold">Сонячний коллектор -</span> ${
        config.gvs_tank_sources.sun_collector.exist
      }, <span style="font-weight: bold">потужність</span> ${config.gvs_tank_sources.sun_collector.pump_power} , кВт</li>
    </ul>
    <p class="gvs"><span style="font-weight: bold">Гаряче водопостачання -</span> ${
      config.gvs.exist
    }, <span style="font-weight: bold">потужність -</span> ${config.gvs.pump_power}, кВт.
      <span style="font-weight: bold">Регулювання температури ГВП</span> ${
        config.gvs["3way"].exist
      }</p>
    <p class="gvs"><span style="font-weight: bold">Ємнісний бойлер -</span> ${
      config.gvs_boiler.exist
    }</p>
  </div >`;
  }

  var resizeTimer;

  $(window).on("resize", function(e) {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      set_ferm_container_dimentions();
    }, 50);
  });

  adjustSettingsAppearence();
  adjustAppearence();
  //console.log($.cookie('role'));
  //var role = $.cookie('role');

  var conn = null;

  $("[type=number]").on("change", function(e) {
    $(e.target).val(
      $(e.target)
        .val()
        .replace(/[^\d\.]/g, "")
    );
  });
  $("[type=number]").on("keypress", function(e) {
    keys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
    return keys.indexOf(event.key) > -1;
  });
});
