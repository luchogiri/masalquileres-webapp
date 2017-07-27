
import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import styles from './terms-modal.css';


class TermsModal extends Component {

  render() {
    return (
      <Modal show={this.props.show} bsSize="large" onHide={this.props.close}>
        <Modal.Header closeButton>
          <Modal.Title style={{ textAlign: 'center' }}>
            TÉRMINOS Y CONDICIONES
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <p>1) Sobre la utilización del sitio.</p>
          <ul>
            <li className={styles.itemModal}>
              <p>a) Estos términos y condiciones generales (en adelante, los TYCS) regulan el acceso y uso de los productos y servicios que ofrece el sitio web masalquileres.com y todos sus subsitios y documentos anexos (en adelante, el SITIO), que DURBAN & KEILLER SRL (en adelante, la EMPRESA) pone a disposición de todos sus clientes y USUARIOS, aún de los espontáneos o temporales (en adelante, el USUARIO o los USUARIOS).</p>
            </li>
            <li className={styles.itemModal}>
              <p>b) La sola utilización del SITIO constituye la condición de USUARIO y se entiende como la aceptación plena y sin reservas por parte del USUARIO de todos y cada uno de los TYCS publicados en el SITIO al momento de su acceso y/o utilización.</p>
            </li>
            <li className={styles.itemModal}>
              <p>c) SI NO ACEPTA ESTOS TÉRMINOS Y CONDICIONES GENERALES, NO UTILICE ESTE SITIO WEB. CUALQUIER PERSONA QUE NO ACEPTE ESTOS TÉRMINOS Y CONDICIONES GENERALES, LOS CUALES TIENEN CARÁCTER OBLIGATORIO Y VINCULANTE, DEBERÁ ABSTENERSE DE UTILIZAR EL SITIO WEB Y/O LOS PRODUCTOS Y SERVICIOS OFRECIDOS.</p>
            </li>
            <li className={styles.itemModal}>
              <p>d) La EMPRESA se reserva el derecho de revisar y/o modificar los productos y servicios ofrecidos, sus precios, estos TYCS y cualquier norma que los complemente, en cualquier momento y cuantas veces lo crea conveniente, los que se entenderán notificados a los USUARIOS por el sólo hecho de publicarse en el SITIO la última versión actualizada. En consecuencia, el USUARIO deberá leer atentamente los TYCS publicados en cada ocasión que se disponga a utilizar el SITIO.</p>
            </li>
            <li className={styles.itemModal}>
              <p>e) El USUARIO se compromete a utilizar el SITIO y los servicios de conformidad con la ley, estas TYCS, las condiciones particulares aplicables, así como con la moral y buenas costumbres generalmente aceptadas y el orden público.</p>
            </li>
            <li className={styles.itemModal}>
              <p>f) El USUARIO se obliga a abstenerse de utilizar el SITIO y los servicios con fines o efectos ilícitos, contrarios a lo establecido en estos TYCS, lesivos de los derechos e intereses de terceros, o que de cualquier forma puedan dañar, inutilizar, sobrecargar o deteriorar el SITIO o impedir la normal utilización del SITIO por parte de los USUARIOS.</p>
            </li>
          </ul>

          <p>2) Objeto</p>
          <ul>
            <li className={styles.itemModal}>
              <p>a) El SITIO es una herramienta de interrelación, administración, y difusión de inmuebles destinados a su comercialización. Al utilizar el SITIO, el USUARIO entrará en relación con una inmobiliaria, que será la encargada de difundir y publicar los inmuebles de acuerdo a la información y condiciones suministrados por el USUARIO, y de la forma que mejor lo crea conveniente.</p>
            </li>
            <li className={styles.itemModal}>
              <p>b) El SITIO no interviene en la comercialización de inmuebles ni en la concreción de las operaciones y de ninguna forma ejerce el corretaje inmobiliario.</p>
            </li>
            <li className={styles.itemModal}>
              <p>c) Si bien el uso, acceso y registración en el SITIO son gratuitos, la contratación de los productos y servicios ofrecidos en él, y la contratación de los servicios de las inmobiliarias que formen parte del SITIO pueden implicar costos que obligarán al USUARIO al pago de comisiones, gastos, honorarios profesionales e impuestos.</p>
            </li>
          </ul>

          <p>3) Condiciones de acceso</p>
          <ul>
            <li className={styles.itemModal}>
              <p>a) La EMPRESA reserva los servicios ofrecidos a través del SITIO exclusivamente para los USUARIOS registrados.</p>
            </li>
            <li className={styles.itemModal}>
              <p>b) El USUARIO se obliga a seleccionar, usar y conservar su clave de acceso (en adelante, la CONTRASEÑA) y a hacer un uso diligente de la misma, así como a no comunicarla ni ponerla a disposición de terceros.</p>
            </li>
            <li className={styles.itemModal}>
              <p>c) El USUARIO se compromete a comunicar a la EMPRESA la pérdida o robo de la CONTRASEÑA, así como cualquier riesgo de acceso a las mismas por un tercero, a la menor brevedad posible.</p>
            </li>
            <li className={styles.itemModal}>
              <p>d) Por razones de seguridad, la EMPRESA se reserva el derecho de establecer periódicamente la caducidad de las CONTRASEÑAS a efectos de forzar a la renovación de las mismas.</p>
            </li>
          </ul>

          <p>4) Información personal y del inmueble, y su validación</p>
          <ul>
            <li className={styles.itemModal}>
              <p>a) Para utilizar el SITIO y publicar un inmueble, el USUARIO debe proporcionar a la EMPRESA los datos de carácter personal (en adelante, los DATOS PERSONALES) que se encuentran en los formularios correspondientes de registración y de perfil de USUARIO. Eventualmente, el USUARIO deberá verificar la veracidad de los DATOS PERSONALES adjuntando a través del formulario correspondiente una copia de su documento único. La EMPRESA se comunicará con el USUARIO a fin de ratificar esos datos. Los DATOS PERSONALES del USUARIO no se considerarán ratificados por el simple hecho de haber cargado la imagen de su documento único en el SITIO, sino que deberá realizar obligatoriamente la validación telefónica.</p>
            </li>
            <li className={styles.itemModal}>
              <p>b) El USUARIO será el único responsable por la veracidad, exactitud, exhaustividad, pertinencia y/o actualidad de los DATOS PERSONALES y de la información del inmueble provista al SITIO y a la inmobiliaria.</p>
            </li>
            <li className={styles.itemModal}>
              <p>c) El USUARIO deberá demostrar su capacidad y habilidad para administrar el inmueble que desea publicar. Para esto deberá proveer un informe de dominio tramitado ante el Registro de la Propiedad Inmueble de la jurisdicción del inmueble. El SITIO ofrecerá la posibilidad de tramitar el informe de dominio necesario a costo del USUARIO, para lo cual el USUARIO deberá proveer una copia o escaneo del título de propiedad del inmueble a través del formulario pertinente.</p>
            </li>
          </ul>

          <p>5) Relacionamiento con la inmobiliaria</p>
          <ul>
            <li className={styles.itemModal}>
              <p>a) El SITIO relacionará al USUARIO con una inmobiliaria de la zona del inmueble que publica, pero no participará de esa relación ni tomará parte en la comercialización del inmueble, ni en la negociación de las condiciones, ni en el cierre de la operación.</p>
            </li>
            <li className={styles.itemModal}>
              <p>b) Por el momento, y hasta nuevo aviso mientras el SITIO se encuentre en su versión BETA, la inmobiliaria encargada del servicio de publicación, difusión y corretaje inmobiliario es Durban & Keiller Asesoramiento Inmobiliario, cuyo corredor responsable es el Sr. Darío Sebastián Durban, con matrículas profesionales CMCPSI 5654 y CUCICBA 5606.</p>
            </li>
          </ul>

          <p>6) Exención de responsabilidad</p>
          <ul>
            <li className={styles.itemModal}>
              <p>a) La EMPRESA no garantiza la disponibilidad y continuidad del funcionamiento del SITIO. Cuando sea posible, LA EMPRESA advertirá previamente las interrupciones en el funcionamiento del SITIO.</p>
            </li>
            <li className={styles.itemModal}>
              <p>b) La EMPRESA no garantiza la utilidad del SITIO para la realización de ninguna actividad en particular, ni su infalibilidad y, en particular, aunque no de modo exclusivo, la concreción de ningún negocio ni operación inmobiliaria. </p>
            </li>
            <li className={styles.itemModal}>
              <p>c) La EMPRESA no será responsable por los daños y perjuicios de toda naturaleza que puedan deberse a la falta de disponibilidad o de continuidad del funcionamiento del SITIO, a la defraudación de la utilidad que los USUARIOS hubieren podido atribuir al SITIO, o a la falibilidad del portal y de los servicios.</p>
            </li>
            <li className={styles.itemModal}>
              <p>d) La EMPRESA garantiza la privacidad y seguridad de la utilización del SITIO, pero no garantiza los aspectos de privacidad y seguridad referidos a las condiciones de las líneas de comunicación de los USUARIOS. En base a esto, la EMPRESA no garantiza que terceros no autorizados no puedan tener conocimiento de la clase, condiciones, características y circunstancias del uso que los USUARIOS hacen del SITIO.</p>
            </li>
            <li className={styles.itemModal}>
              <p>e) La EMPRESA no será responsable por los daños y perjuicios de toda naturaleza que pudieran deberse al conocimiento que puedan tener terceros no autorizados de la clase, condiciones, características y circunstancias del uso que los USUARIOS hacen del SITIO.</p>
            </li>
            <li className={styles.itemModal}>
              <p>f) La EMPRESA no será responsable por los daños y perjuicios que puedan deberse al accionar de los USUARIOS con respecto a:</p>
            </li>

              <li className={styles.itemModal}>
                <p>i) el incumplimiento de la ley, la moral y las buenas costumbres generalmente aceptadas o el orden público como consecuencia de la transmisión, difusión, almacenamiento, puesta a disposición, recepción, obtención o acceso a los contenidos;</p>
              </li>
              <li className={styles.itemModal}>
                <p>ii) la infracción de los derechos de propiedad intelectual e industrial, de los secretos empresariales, de compromisos contractuales de cualquier clase, de los derechos al honor, a la intimidad personal y familiar y a la imagen de las personas, de los derechos de propiedad y de toda otra naturaleza pertenecientes a un tercero como consecuencia de la transmisión, difusión, almacenamiento, puesta a disposición, recepción, obtención o acceso a los contenidos;</p>
              </li>
              <li className={styles.itemModal}>
                <p>iii) la realización de actos de competencia desleal y publicidad ilícita como consecuencia de la transmisión, difusión, almacenamiento, puesta a disposición, recepción, obtención o acceso a los contenidos;</p>
              </li>
              <li className={styles.itemModal}>
                <p>iv) la falta de veracidad, exactitud, exhaustividad, pertinencia y/o actualidad de los contenidos; toda vez que el USUARIO es quien los ingresa siendo fuente de los mismos datos.</p>
              </li>
              <li className={styles.itemModal}>
                <p>v) la inadecuación para cualquier clase de propósito y la defraudación de las expectativas generadas por los contenidos;</p>
              </li>
              <li className={styles.itemModal}>
                <p>vi) el incumplimiento, retraso en el cumplimiento, cumplimiento defectuoso o terminación por cualquier causa de las obligaciones contraídas por terceros y contratos realizados con terceros a través de o con motivo del acceso a los contenidos;</p>
              </li>
              <li className={styles.itemModal}>
                <p>vii) los vicios y defectos de toda clase de los contenidos transmitidos, difundidos, almacenados, puestos a disposición o de otra forma transmitidos o puestos a disposición, recibidos, obtenidos o a los que se haya accedido a través del portal o de los servicios.</p>
              </li>
              <li className={styles.itemModal}>
                <p>viii) La EMPRESA no tiene obligación de y no controla la utilización que los USUARIOS hacen del SITIO. En particular, la EMPRESA no garantiza que los USUARIOS utilicen el SITIO de conformidad con estas Condiciones Generales y, en su caso, las Condiciones Particulares que resulten de aplicación, ni que lo hagan de forma diligente y prudente.</p>
              </li>
              <li className={styles.itemModal}>
                <p>ix) La EMPRESA excluye cualquier responsabilidad por los daños y perjuicios de toda naturaleza que pudieran deberse a la utilización de los servicios y de los contenidos por parte de los USUARIOS o que puedan deberse a la falta de veracidad, vigencia, exhaustividad y/o autenticidad de la información que los USUARIOS proporcionan a otros USUARIOS o ingresan en los formularios de registro, acerca de sí mismos o de los inmuebles que publican y, en particular, aunque no de forma exclusiva, por los daños y perjuicios de toda naturaleza que puedan deberse a la suplantación de la personalidad de un tercero efectuada por un USUARIO en cualquier clase de comunicación realizada a través del portal.</p>
              </li>
          </ul>

          <p>7) Duración del servicio, derecho de admisión y uso del SITIO, terminación</p>
          <ul>
            <li className={styles.itemModal}>
              <p>a) La prestación del servicio, en principio, es de duración indefinida. La EMPRESA, no obstante, está autorizada para dar por terminada o suspender la prestación del SITIO y/o de cualquiera de los servicios en cualquier momento, sin perjuicio de lo que se hubiere dispuesto al respecto en las correspondientes Condiciones Particulares. Cuando ello sea razonablemente posible, La EMPRESA advertirá previamente la terminación o suspensión de la prestación del servicio.</p>
            </li>
            <li className={styles.itemModal}>
              <p>b) La EMPRESA se reserva el derecho a denegar o retirar el acceso al SITIO, en cualquier momento y sin necesidad de preaviso, a aquellos USUARIOS que incumplan estas Condiciones Generales o las Condiciones Particulares y/o Comerciales que resulten de aplicación.</p>
            </li>
          </ul>

          <p>8) Jurisdicción</p>
          <ul>
            <li className={styles.itemModal}>
              <p>a) Estos TYCS se rigen por las leyes de la República Argentina. La EMPRESA y el USUARIO, con renuncia expresa a cualquier otro fuero, se someten al de los Juzgados y Tribunales Comerciales de San Isidro para cualquier controversia que pudiera derivarse de la prestación de los servicios objeto de estas Condiciones Generales.</p>
            </li>
          </ul>

          <p>9) Consentimiento</p>
          <ul>
            <li className={styles.itemModal}>
              <p>a) Los USUARIOS, al hacer Click en Aceptar, aceptan y declaran haber leído los presentes TYCS y expresan pleno consentimiento con los mismos. En caso que surja modificación alguna de los datos ingresados estos deberán ser notificados por su titular.</p>
            </li>
          </ul>
        </Modal.Body>

        <Modal.Footer style={{ textAlign: 'center' }}>
          <Button bsStyle="primary" className={ styles['form-button'] } onClick={this.props.close}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default TermsModal;
