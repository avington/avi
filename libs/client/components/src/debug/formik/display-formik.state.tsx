/* eslint-disable-next-line */
export interface DisplayFormikStateProps {}

/**
 *
 * @description This is a control used for debugging Formik forms. It displays the Formik Form state on the screen in JSON format
 * @param props Formik Props
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function DisplayFormikState(props: any) {
  return (
    <div style={{ margin: '1rem 0' }}>
      <pre
        style={{
          background: '#f6f8fa',
          fontSize: '.65rem',
          padding: '.5rem',
        }}
      >
        <strong>props</strong> = {JSON.stringify(props, null, 2)}
      </pre>
    </div>
  );
}

export default DisplayFormikState;
