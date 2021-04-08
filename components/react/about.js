import baseStyles from '../../styles/modules/common/base.module.scss'

export default function About (props) {

  const data = props.data

  return (
      <>
        <h2>{data.name}</h2>
        <img src={data.name_image.url} />
      </>
  )

}