define(['https://unpkg.com/postmonger'], function(Postmonger) {

  const connection = new Postmonger.Session();
  let activity = {};

  connection.on('initActivity', function(data) {
    activity = data;

    const inArgs = activity?.arguments?.execute?.inArguments || [];
    const mensagem = inArgs[0]?.mensagem || "";

    document.getElementById("mensagem").value = mensagem;
  });

  connection.trigger('ready');

  connection.trigger('updateButton', {
    button: 'next',
    text: 'Concluído',
    visible: true,
    enabled: true
  });

  connection.on('clickedNext', function() {
    const mensagem = document.getElementById("mensagem").value;

    activity.arguments = activity.arguments || {};
    activity.arguments.execute = activity.arguments.execute || {};

    activity.arguments.execute.inArguments = [
      { mensagem }
    ];

    activity.metaData = activity.metaData || {};
    activity.metaData.isConfigured = true;

    connection.trigger('updateActivity', activity);
  });

});
