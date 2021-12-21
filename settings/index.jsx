function mySettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Configuration Settings</Text>}>
        <TextInput
          settingsKey="dbURL"
          label="dbURL:"
        />
        <TextInput
          settingsKey="user"
          label="user name:"
        />
      </Section>
      <Section
        title={<Text bold align="center">Instructions</Text>}>
        <Text>
        This app requires a URL configuration setting to be set before it can be run successfully. The URL setting is used by each of the UI views to determine the endpoint to make HTTP/HTTPS (GET and POST) requests to.

        If you are testing, a good option would be to use a free request testing service such as "https://www.requestcatcher.com" and "https://yourproject.firebaseio.com"
        </Text>
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);
