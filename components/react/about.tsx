import baseStyles from '../../styles/modules/common/base.module.scss'

interface Props {
  data: {
    name: string,
    name_image: {
      url: string
    }
  }
}

const About: React.FC<Props> = ({data}) => {

  return (
      <>
        <h2>{data.name}</h2>
        <img src={data.name_image.url} />
      </>
  )

}

export default About